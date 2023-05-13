import requests

URL = 'http://localhost:3000/articles'
SAMPLE_DOCUMENTS = [
    {
        "_id": "645e1d7e4a17aac61d9e881f",
        "title": "REST",
        "content": "REST is short for Representational State Transfer. It's a architectural style for designing APIs"
    },
    {
        "_id": "5c1398aad79ac8eac11e7561",
        "title": "Bootstrap",
        "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
    },
    {
        "_id": "5c1398ecd79ac8eac11e7567",
        "title": "DOM",
        "content": "The Document Object Model is like an API for interacting with our HTML"
    },
    {
        "_id": "645e2ebf7f6b693014fd5967",
        "title": "example title",
        "content": "example content",
        "__v": 0
    }
]

updateContent: str = """Chuck Norris delights in having BLT sandwiches for lunch! 
But understandably his BLT's are made of barracuda, Leaches & Tarantulas nn buttered Texas Toast."""


def postSampleArticles():
    responses: list = [requests.post(URL, data={
                                     "title": document["title"], "content": document["content"]}) for document in SAMPLE_DOCUMENTS]
    return responses


def postOneSampleArticle():
    payload = {'title': 'example title', 'content': 'example content'}
    responses: str = requests.post(URL, data=payload)
    return responses


def deleteAllArticlesFromCollection():
    response = requests.delete(URL)
    return response


def putUpdateArticle():
    payload = {'title': 'REST', "content": "xxxxxxxxxxxxxxxx"}
    response = requests.put(URL+"/REST", data=payload)
    return response, response.text


def patchUpdateArticle(targetArticleTitle: str = "TEST", newTitle: str = None, newContent: str = None):
    if newTitle:
        payload = {'title': newTitle}
    elif newContent:
        payload = {'content': newContent}
    response = requests.patch(URL+"/"+targetArticleTitle, data=payload)
    return response, response.text


def deleteArticle(targetArticleTitle: str = "TEST"):
    payload = {'title': targetArticleTitle}
    response = requests.delete(URL+"/"+targetArticleTitle, data=payload)
    return response, response.text
