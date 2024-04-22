from flask import request , jsonify
from config import app
import xml.etree.ElementTree as ET


class Artiste:
    def __init__(self, id, nom,picture, ville, site, biographie, albums):
        self.id = id
        self.nom = nom
        self.picture =picture
        self.ville = ville
        self.site = site
        self.biographie = biographie
        self.albums = albums

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.nom,
            "picture":self.picture,
            "ville": self.ville,
            "site": self.site,
            "biographie": self.biographie,
            "albums": [album.to_dict() for album in self.albums],
        }


class Album:
    def __init__(self, ref, titre, annee, photo, songs):
        self.ref = ref
        self.titre = titre
        self.annee = annee
        self.photo = photo
        self.songs = songs

    def to_dict(self):
        return {
            "ref": self.ref,
            "titre": self.titre,
            "annee": self.annee,
            "photo": self.photo,
            "songs": self.songs,
        }
    
def getArtistes(artiste, albums):
    id = artiste.get("no")
    albums_for_artist = []

    for album in albums:
        ref_tag = album.find("ref-artiste")
        ref = ref_tag.get("ref")
        if id == ref:
            annee = album.get("annee")
            photo = album.get("photo")
            titre = album.find("titre").text
            songs = [song.text for song in album.find("chansons")]
            album_obj = Album(ref, titre, annee, photo, songs)
            albums_for_artist.append(album_obj)

    nom = artiste.get("nom")
    picture = artiste.get("photo")
    ville = artiste.get("ville")
    site = artiste.find("site").get("url")
    biographie = artiste.find("biographie").text

    artist_obj = Artiste(id, nom, picture, ville, site, biographie, albums_for_artist)
    
    return artist_obj  


tree = ET.parse("artisteDevoir.xml")
root = tree.getroot()
artistes = tree.findall("artiste")
albums = tree.findall("album")
artistes_list = []



albums_by_artist = {}

for artiste in artistes:
    artiste_obj = getArtistes(artiste, albums)
    artistes_list.append(artiste_obj)


# for artiste in artistes_list:
#     print(artiste.id, artiste.nom, artiste.ville, artiste.site, artiste.biographie)
#     for album in artiste.albums:
#         print("\n\n hello world :",album.titre)

searchArtiste = ""



@app.route("/api/getArtistes", methods=["GET"]) 
def get_artistes():
    artistes_dict = [artiste.to_dict() for artiste in artistes_list]
 
    return jsonify({"artistes": artistes_dict}),200

@app.route("/api/<artiste_name>", methods=["GET"])
def get_artiste(artiste_name):
     for artiste in artistes_list:
        if artiste_name.lower() in  artiste.nom.lower() :  
            return jsonify({"artiste": artiste.to_dict()}), 200  

     return jsonify({"exists": False}), 404  

if __name__ == '__main__':
    app.run(debug=True)

