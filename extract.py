import cv2
import matplotlib.pyplot as plt
import numpy as np
from .detect import decode_predictions
from .utils import *

def EAST(image, east='Inputs/frozen_east_text_detection.pb', w=640, h=640, confThreshold=0.5,
         nmsThreshold=0.4):
    # image = cv2.imread(src)
    orig = image.copy()
    mask = np.zeros(orig.shape, dtype=np.uint8)
    orig1 = image.copy()
    (origH, origW) = image.shape[:2]
    # set the new width and height and then determine the ratio in change
    # for both the width and height
    (newW, newH) = (w, h)
    rW = origW / float(newW)
    rH = origH / float(newH)
    # resize the image and grab the new image dimensions
    image = cv2.resize(image, (newW, newH))
    (H, W) = image.shape[:2]
    # define the two output layer names for the EAST detector model that
    # we are interested in -- the first is the output probabilities and the
    # second can be used to derive the bounding box coordinates of text
    layerNames = [
        "feature_fusion/Conv_7/Sigmoid",
        "feature_fusion/concat_3"]
    # load the pre-trained EAST text detector
    #print("[INFO] loading EAST text detector...")
    net = cv2.dnn.readNet(east)
    # construct a blob from the image and then perform a forward pass of
    # the model to obtain the two output layer sets
    blob = cv2.dnn.blobFromImage(image, 1.0, (W, H),
                                 (123.68, 116.78, 103.94), swapRB=True, crop=False)
    net.setInput(blob)
    (scores, geometry) = net.forward(layerNames)
    # decode the predictions, then  apply non-maxima suppression to
    # suppress weak, overlapping bounding boxes
    (boxes, confidences) = decode_predictions(scores, geometry)

    # Extract ROI
    roi = []
    coord = []
    indices = cv2.dnn.NMSBoxesRotated(boxes, confidences, confThreshold, nmsThreshold)
    indices = sorted(indices, key=lambda x: x[0])
    for i in indices:
        # get 4 corners of the rotated rect
        vertices = cv2.boxPoints(boxes[i[0]])  # find the four vertices of a rotated rect
        # scale the bounding box coordinates based on the respective ratios
        for j in range(4):
            vertices[j][0] *= rW
            vertices[j][1] *= rH
        for j in range(4):
            p1 = (vertices[j][0], vertices[j][1])
            p2 = (vertices[(j + 1) % 4][0], vertices[(j + 1) % 4][1])
            cv2.line(mask, p1, p2, (255, 255, 255), 4)
        # coord.append(  np.array( [[vertices[1][0],vertices[1][1] ],[vertices[2][0],
        #           vertices[2][1]],[vertices[3][0],vertices[3][1]],[vertices[0][0],vertices[0][1] ]]) )
        coord.append(np.array([[vertices[0][0], vertices[0][1]], [vertices[1][0],
                                                                  vertices[1][1]], [vertices[2][0], vertices[2][1]],
                               [vertices[3][0], vertices[3][1]]]))
    mask = cv2.cvtColor(mask, cv2.COLOR_BGR2GRAY)
    #plt.imshow(mask, cmap="gray") checking
    #plt.show()
    res = sort_img(mask, coord)  # sorting rois in order of their appearence in the image
    """
    #pour gain du temps 
    for v in res:

        cropped = fourPointsTransform(orig1, v)
        roi.append(cropped)
    """
    roi=[fourPointsTransform(orig1, v) for v in res ]
        # plt.imshow(cropped)
        # plt.show()
    """
        for j in range(4):
            p1 = (v[j][0], v[j][1])
            p2 = (v[(j + 1) % 4][0], v[(j + 1) % 4][1])
            cv2.line(orig, p1, p2, (0, 255, 0), 1)
    plt.figure(figsize=(10, 10))
    plt.imshow(orig)
    plt.show()
    """""
    return roi

