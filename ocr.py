import pytesseract
from .utils import skew
from .extract import EAST
import cv2
pytesseract.pytesseract.tesseract_cmd = (
   r'C:\Users\Ikhlass\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'
)
def ocr(src):
 words=[]
 #roi=EAST(skew(src))
 #roi=EAST(cv2.imread(src))
 roi=EAST(src)
 config = ("-l fra --oem 1 --psm 7")
 #f=open('res.txt','a')
 for image in roi:
  if (image.shape[0]==0 or image.shape[1]==0):
    roi.remove(image)
  else:
   text=pytesseract.image_to_string(image,config=config)
   words.append(text)
 return words