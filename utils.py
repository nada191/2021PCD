#tesseract-ocr-fra/libtesseract-dev
import numpy as np
import cv2
import re
import pytesseract
#extraction of rotated ROIs
def fourPointsTransform(frame, vertices):  # avec mes modif
    vertices = np.asarray(vertices)  # convert an input to array
    pt_A = vertices[1]
    pt_B = vertices[2]
    pt_C = vertices[3]
    pt_D = vertices[0]

    vertices = np.float32([pt_A, pt_B, pt_C, pt_D])
    width_AD = np.sqrt(((pt_A[0] - pt_D[0]) ** 2) + ((pt_A[1] - pt_D[1]) ** 2))
    width_BC = np.sqrt(((pt_B[0] - pt_C[0]) ** 2) + ((pt_B[1] - pt_C[1]) ** 2))
    w = max(int(width_AD), int(width_BC))

    height_AB = np.sqrt(((pt_A[0] - pt_B[0]) ** 2) + ((pt_A[1] - pt_B[1]) ** 2))
    height_CD = np.sqrt(((pt_C[0] - pt_D[0]) ** 2) + ((pt_C[1] - pt_D[1]) ** 2))
    h = max(int(height_AB), int(height_CD))


    outputSize = (w, h)  # w,h
    targetVertices = np.array([
        [0, outputSize[1] - 1],
        [0, 0],
        [outputSize[0] - 1, 0],
        [outputSize[0] - 1, outputSize[1] - 1]], dtype="float32")

    # cv2.getPrespectiveTransform(src,dst)
    # src: coordinates in the source image
    # dst: coordinates in the output image
    rotationMatrix = cv2.getPerspectiveTransform(vertices, targetVertices)
    # prespective transf preserves collinearity and incidence. This means that the straight lines will remain straight even after the transformation.
    result = cv2.warpPerspective(frame, rotationMatrix, (w, h))
    h, w = result.shape[:2]
    if h > w:
        result = cv2.rotate(result, cv2.ROTATE_90_CLOCKWISE)
    return result


def split_to_lines(img):  #split the mask (image with background color with the bounding boxes in white)to lines
    h, w = img.shape[:2]
    sumOfRows = np.sum(img, axis=1)
    # loop the summed values
    startindex = 0
    lines = []
    compVal = True
    for i, val in enumerate(sumOfRows):

        # logical test to detect change between 0 and > 0
        testVal = (val.all() > 0)
        if testVal == compVal:
            # when the value changed to a 0, the previous rows
            # contained contours, so add start/end index to list
            if val.all() == 0:
                lines.append((startindex, i))
                # update startindex, invert logical test
                startindex = i + 1
            compVal = not compVal
    return lines

def sort_img(img, vertices):
    """
    contours = []
    lines = split_to_lines(img)
    for i, v in enumerate(vertices):
        contours.append((cv2.convexHull(v), i))  # i indice dans vertices
    """
    lines = split_to_lines(img)
    contours=[(cv2.convexHull(v), i) for i,v in enumerate(vertices)]
    # create empty list
    lineContours = []
    # find contours (you already have this)
    # contours, hier = cv2.findContours(img,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE) #1 essai
    # loop contours, find the boundingrect,
    # compare to line-values
    # store line number,  x value and contour index in list
    for j, cnt in enumerate(contours):
        (x, y, w, h) = cv2.boundingRect(cnt[0])
        for i, line in enumerate(lines):
            if y >= line[0] and y <= line[1]:  # and replaced by or
                lineContours.append(([line[0], x, j], cnt[1]))
                break
    # sort list on line number,  x value and contour index
    contours_sorted = sorted(lineContours, key=lambda e: e[0])
    #print(len(contours_sorted)) checking
    # write list index on image
    return [vertices[cnt[1]] for cnt in contours_sorted]


#correction of rotated images
def rotate_bound(image, angle):

        (h, w) = image.shape[:2]
        ### centroid
        (cX, cY) = (w // 2, h // 2)
        ### creating rotation matrix
        if angle != 0:
            M = cv2.getRotationMatrix2D((cX, cY), -angle, 1.0)

            cos = np.abs(M[0, 0])
            sin = np.abs(M[0, 1])
            nW = int((h * sin) + (w * cos))
            nH = int((h * cos) + (w * sin))
            M[0, 2] += (nW / 2) - cX
            M[1, 2] += (nH / 2) - cY

            return cv2.warpAffine(image, M, (nW, nH))
        else:

            return image


def skew(src):  # skew correction for rotated photos
    image = cv2.imread(src)
    ###getting orientation info
    try:
        # images rotated at angles 90,180, 270 and for upright(0deg) images else a warning will be triggered
        newdata = pytesseract.image_to_osd(image)
        angle = re.search('(?<=Rotate: )\d+', newdata).group(0)
        ### rotating image with angle
        skew_corrected_image = rotate_bound(image, float(angle))
        #print("skew angle ", angle)
        image = skew_corrected_image

    except:
        pass
    return image