import xml.etree.ElementTree as ET

tree = ET.parse("artisteDevoir.xml")
root = tree.getroot()
artistes = tree.findall("artiste")
artistes_names = []

for artiste in artistes:
 nom = artiste.get("nom")
 artistes_names.append(nom)

# print(artistes_names)