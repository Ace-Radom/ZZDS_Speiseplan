import json
import requests

from datetime import datetime , timezone

url = "https://www.zinzendorfschulen.de/schueler-eltern/mensa-speiseplan/"

def main():
    response = requests.get( url )
    if response.status_code == 200:
        text = response.text
    else:
        print( "Failed to fetch HTML data." )
        exit( 1 )

    menu_list = []

    bpos = text.index( "KW" )
    epos = -1

    for i in range( 0 , 5 ):
        bpos = text.index( "<div class=\"info\">" , bpos )
        bpos = text.index( "<strong class=\"title\">" , bpos ) + 22
        epos = text.index( "</strong>" , bpos )
        entree = text[bpos:epos]
        bpos = text.index( "<p class=\"desc\">" , bpos ) + 16
        epos = text.index( "</p>" , bpos )
        dessert = text[bpos:epos]
        bpos = text.index( "<strong class=\"title\">" , bpos ) + 22
        epos = text.index( "</strong>" , bpos )
        entree_v = text[bpos:epos]
        bpos = text.index( "<p class=\"desc\">" , bpos ) + 16
        epos = text.index( "</p>" , bpos )
        dessert_v = text[bpos:epos]
        menu_list.append( {
            "e": entree,
            "d": dessert,
            "ev": entree_v,
            "dv": dessert_v
        } )

    root = {
        "menu": menu_list,
        "last_update": int( datetime.now( timezone.utc ).timestamp() )
    }

    with open( "menu.json" , 'w' , encoding = "utf-8") as wFile:
        json.dump( root , wFile , ensure_ascii = False , indent = 4 )

if __name__ == "__main__":
    main()
