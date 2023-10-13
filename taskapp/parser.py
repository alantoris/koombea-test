import urllib.request
from bs4 import BeautifulSoup

class Parser:
    """
    Class in charge of processing the html of the urls and 
    making the title and information of the links available.
    """
    parser = 'html.parser'
    
    def __init__(self, url):
        self.url = url
        resp = urllib.request.urlopen(self.url)
        self.soup = BeautifulSoup(
            resp, self.parser, from_encoding=resp.info().get_param('charset'))
    
    def get_title(self):
        return self.soup.title.string
    
    def get_all_links(self):
        links = []
        for link in self.soup.find_all('a', href=True):
            links.append({"href":link['href'], "body":link.string})
        return links
