import typer
import xml.etree.ElementTree as ET
import webbrowser
import os
from PyInquirer import prompt, print_json, Separator
from rich import print as rprint

mytree = ET.parse('artisteDevoir.xml')
myroot = mytree.getroot()

app = typer.Typer()

@app.command("start")
def start():
    questions = [
        {
            'type': 'list',
            'name': 'action',
            'message': 'Que voulez-vous faire?',
            'choices': [
                'Afficher les Artistes',
                'Chercher un Artiste',
                'Clear Console',
                'Quitter'
            ]
        }
    ]
    answers = prompt(questions)
    if answers.get('action') == 'Afficher les Artistes':
        show_artists()
    elif answers.get('action') == 'Chercher un Artiste':
        search_artist()
    elif answers.get('action') == 'Clear Console':
        clear = lambda: os.system('cls')
        clear()
        start()
    elif answers.get('action') == 'Quitter':
        quit()

def show_artists():
    questions = [
        {
            'type': 'list',
            'name': 'action',
            'message': 'Choisissez un artiste',
            'choices': [
                Separator('== Artistes ==')
            ]
        }
    ]
    for artist in myroot.findall('artiste'):
        questions[0]['choices'].append(artist.attrib['nom'])
    questions[0]['choices'].append('Retour')
    answers = prompt(questions)
    if answers.get('action') == 'Retour':
        start()
    else:
        show_artist(answers.get('action'))


def show_artist(artist_name):
    rprint()
    for artist in myroot.findall(f"./artiste[@nom='%s']" % artist_name):
        rprint(f"[bold]Nom de l'artiste:[/bold] {artist_name}")
        rprint(f"[bold]Biographie:[/bold] {artist.find('biographie').text}")
        rprint(f"[bold]Ville de l'artiste:[/bold] {artist.get('ville')}")
        rprint(f"[bold]Site web:[/bold] {artist.find('site').get('url')}")
        rprint("---------------------------------")
        rprint("[bold underline]ALBUMS:[/bold underline]")
        ref=artist.get('no')
        i=1
        for album in myroot.findall(f"./album/ref-artiste[@ref='%s']..." % ref):
            rprint('== Album ' + str(i) + ' ==')
            rprint(f"[bold]Titre de l'album:[/bold] {album.find('titre').text}")
            rprint(f"[bold]Année de l'album:[/bold] {album.get('annee')}")
            rprint(f"[bold]Chansons:[/bold] {show_songs(album)}")
            i+=1
    rprint()
    start()

def show_songs(album):
    song_names = []
    chansons = album.find('chansons')
    for song in chansons.findall('chanson'):
        song_names.append(song.text)
    return song_names

def search_artist():
    found = False
    questions = [
        {
            'type': 'input',
            'name': 'artist_name',
            'message': 'Entrez le nom de l\'artiste que vous cherchez'
        }
    ]
    answers = prompt(questions)
    artist_name = answers.get('artist_name')
    for artist in myroot.findall('artiste'):
        if artist_name.casefold() == artist.attrib['nom'].casefold():
            show_artist(artist.attrib['nom'])
            found = True
            break
        else:
            continue
    if found == False:
        rprint(f"L'artiste {artist_name} n'existe pas dans la base de données")
        start()

        
    

if __name__ == "__main__":
    app()
  
