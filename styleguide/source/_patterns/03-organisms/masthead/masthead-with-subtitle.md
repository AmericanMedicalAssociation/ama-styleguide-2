---
el: ".ama__header--article"
title: "Masthead with Subtitle"
---

A variant of the Masthead that includes a subtitle.

[EWL-4485](https://issues.ama-assn.org/browse/EWL-4485)

### Variables
~~~
{
  "masthead": {
    "link": {
      href:
        type: string / required
      text:
        type: string / required
      class:
        type: string / optional
      target:
        type: string / optional
      title:
        type: string / optional
      icon:
        type: string / optional
    },
    "heading": {
      level:
        type: string / required
      text:
        type: string / required
      class:
        type: string / optional
    },
    "subtitle": {
      text: string / optional
    },
    "social": [
      {
        "text": "facebook",
        "icon": "facebook",
        "url": "www.facebook.com\/AmericanMedicalAssociation"
      },
      {
        "text": "googleplus",
        "icon": "googleplus",
        "url": "plus.google.com\/+americanmedicalassociation"
      },
      {
        "text": "twitter",
        "icon": "twitter",
        "url": "twitter.com\/AmerMedicalAssn"
      },
      {
        "text": "linkedin",
        "icon": "linkedin",
        "url": "www.linkedin.com\/company\/american-medical-association"
      },
      {
        "text": "youtube",
        "icon": "youtube",
        "url": "www.youtube.com\/user/AmerMedicalAssn"
      }
    ],
    "bio": {
      "image": {
        alt:
          type: string / required
        src:
          type: string (url) / required
        height:
          type: string / required
        width:
          type: string / required
      },
      "heading": {
        level:
          type: string / required
        text:
          type: string / required
        class:
          type: string / optional
      },
      paragraphs {
        text:
          type: string
        class:
          type: string / optional
      },
        {
          "text": "Emergency Medicine",
          "class": "ama__inline-bio__meta"
        }],
      links: [{
        title: 
          string / required
        href: 
          string / required
        text: 
          string / optional
        target: 
          string / optional
        class: 
          "ama__link--icon ama__inline-bio__link",
        icon: 
          string / optional
      },
        {
          "title": "Bio link",
          "href": "#",
          "text": "Full Bio",
          "target": "_self",
          "class": "ama__inline-bio__link"
        }]
    }
  }
}

~~~
