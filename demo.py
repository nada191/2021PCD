import json
import os
from flask_cors import CORS, cross_origin
import cx_Oracle
from flask import Flask, request, jsonify
cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\Public\Pictures\instantclient_19_10")

connection = cx_Oracle.connect("site1", "site1", "DESKTOP-87LLS24:1521/orcl")
print("Successfully connected to Oracle Database")

################################################################################
#
# Specify some routes
#
# The default route will display a welcome message:
#   http://127.0.0.1:8080/
#
# To insert new a user 'fred' you can call:
#    http://127.0.0.1:8080/post/fred
#
# To find a username you can pass an id, for example 1:
#   http://127.0.0.1:8080/user/1
#


app = Flask(__name__)








CORS(app, support_credentials=True)
#end_point
@app.route('/med/', methods=['POST'])
@cross_origin()
def index3():
    if request.method == 'POST' and 'spec' in request.form:
        spec = request.form.get('spec')
        print(spec)
        cursor = connection.cursor()
        query = ("""select specialite , forme,dosage,presentation from medicament where specialite =  '%s'""" % spec)
        resultat = cursor.execute(query)
        print("requete envoyee")
        liste = []
        #i = 1
        for row in resultat:
            print(row)
            liste.append(row)
            #i=i+1
        print(liste)
        #return "succes"
        return jsonify(liste)
    return "erreur"


@app.route('/pharmacieconcernee/', methods=['POST'])
@cross_origin()
def indexnada():
    if request.method == 'POST' and 'med' in request.form:
        med = request.form.get('med')
        grandeliste = json.loads(med)
        cursor = connection.cursor()
        Lglobale = []
        for petiteliste in grandeliste:
            query = ("""select idpharm,QUANTITESTOCK from TousMed where specialite =  '%s' and dosage =  '%s' and forme =  '%s' and presentation =  '%s' and QUANTITESTOCK >  '%d'""" % (petiteliste[0], petiteliste[2], petiteliste[1], petiteliste[3], 0))
            resultat = cursor.execute(query)
            dict = {}
            L=[]
            chmed = " ".join(petiteliste)
            for row in resultat:
                print(row)
                L.append(row) # [[],[],...]
            dict[chmed] = L
            Lglobale.append(dict)
        #maintenant on a [{"chmed":[idpharm,qte]},...]
        dictfinal = {}
        listefinale = []
        for i in Lglobale: # i est le dict
            listedesinfodesids = []  # liste qui va contenir les listes des infos des differents id
            for ch, id in i.items():  # id est la valeur du dict qui est une liste des ids,qtes
                for k in id:
                    listeinfopharm = []  # pour chaque id on va creer une liste qui va contenir ses infos
                    query1 = ("""select nom, adresse, latitude, longitude, tel from pharmacie where idpharm =  '%d'""" % k[0])
                    resultat1 = cursor.execute(query1).fetchall()[0]
                    print(resultat1)
                    res = list(resultat1)
                    res.append(k[1])
                    print(len(res))
                    listedesinfodesids.append(res)

                    print(listedesinfodesids)
                dictfinal[ch] = listedesinfodesids
        listefinale.append(dictfinal)
        print(listefinale)
        # return "succes" comment
        return jsonify(listefinale)
    return "erreur"


#welcome page
@app.route('/')
def index():
    return "Welcome to the demo app"


################################################################################
#
# Initialization is done once at startup time
#
if __name__ == '__main__':
    app.run(port=int(os.environ.get('PORT', '8080')))
