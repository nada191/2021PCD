import numpy as np
import math
import cv2
def decode_predictions(scores, geometry,min_confidence=0.5):
  # grab the number of rows and columns from the scores volume, then
	# initialize our set of bounding box rectangles and corresponding
	# confidence scores
  (numRows, numCols) = scores.shape[2:4]
  rects=[]
  confidences=[]
  # loop over the number of rows
  for y in range(0, numRows):
		# extract the scores (probabilities), followed by the
		# geometrical data used to derive potential bounding box
		# coordinates that surround text

     scoresData=scores[0,0,y]
     xData0 = geometry[0, 0, y]
     xData1=geometry[0, 1, y]
     xData2=geometry[0, 2, y]
     xData3=geometry[0, 3, y]
     anglesData=geometry[0, 4, y]
     for x in range(0, numCols):
			# if our score does not have sufficient probability,
			# ignore it
       if scoresData[x]<min_confidence:
         continue
      # compute the offset factor as our resulting feature
			# maps will be 4x smaller than the input image
       (offsetX,offsetY) = (x * 4.0, y * 4.0)
      # extract the rotation angle for the prediction and
			# then compute the sin and cosine
       angle=anglesData[x]
       cos=np.cos(angle)
       sin= np.sin(angle)
      # use the geometry volume to derive the width and height
			# of the bounding box
       h=xData0[x] + xData2[x]
       w=xData1[x] + xData3[x]
       offset=([offsetX + cos * xData1[x] + sin * xData2[x], offsetY - sin * xData1[x] + cos * xData2[x]])
       # Find points for rectangle
       p1=(-sin * h + offset[0], -cos * h + offset[1])
       p3=(-cos * w + offset[0], sin * w + offset[1])
       center=(0.5 * (p1[0] + p3[0]), 0.5 * (p1[1] + p3[1]))
       rects.append((center, (w, h), -1 * angle * 180.0 / math.pi))
       confidences.append(float(scoresData[x]))
  return (rects, confidences)


