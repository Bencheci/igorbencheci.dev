---
title: Mountain Dew DEWnited States, a collect-all-50 promotion site
summary: The promotion site behind Mountain Dew's 50-state bottles, where fans scanned a label with their phone camera, right in the browser, and image recognition added that state to their collection.
seoTitle: "Mountain Dew DEWnited States promo site"
seoDescription: "The site behind Mountain Dew's 50-state bottles: fans scanned a label in the browser and image recognition added that state to their collection."
period: '2019'
order: 103
kind: earlier
cardTitle: "DEWnited States"
cardLine: "In-browser label scanning with image recognition · 50-state bottle promotion"
role: Developer, built the full site experience
industry: Consumer brands
stack: [Amazon Rekognition, Google Cloud Vision, tracking.js, In-browser camera, Collection map, User accounts]
category: [Campaigns]
images:
  - { src: /img/work/dewnited-hero.webp, alt: 'DEWnited States home screen: 50 states, 50 labels, one way to score $100' }
  - { src: /img/work/dewnited-scene.webp, alt: Illustrated Colorado state scene from the collection }
  - { src: /img/work/dewnited-map.webp, alt: US map that fills in as states are collected }
video: 'vimeo:753858654/3b9b5c04dc'
videoLabel: DEWnited States national spot (animation by Andy Baker Studio)
links:
  - { label: PepsiCo announcement, href: 'https://www.pepsico.com/newsroom/press-releases/2019/50-states-50-unique-labels-mtn-dew-celebrates-the-land-of-those-who-do-from-sea-to-shining-sea-with-dewnited-states' }
---

In summer 2019 Mountain Dew released 50 bottles, one label per state, backed by a national TV campaign.
Fans entered the code from each bottle and scanned the label on the promotion site; every state they
collected lit up on their map and unlocked an illustrated scene, and collecting all 50 scored a $100
prepaid card.

It was the agency's first build with image recognition. The site opened the phone camera straight
from the browser, with no app to install. Fans pointed it at the bottle, and the pattern on the label
told us which state it was. I used Amazon Rekognition for the label recognition, Google Cloud for reading the label text and
other checks, and tracking.js, an open-source computer
vision library, for the scanning effect, which tracked the dots on the label while it matched, then added the state to the fan's
collection.

I built the site experience end to end: the camera scan and recognition flow, code entry, accounts and
collection history, the illustrated state pages and the progress map, plus the closed and error states
for a national promotion with a fixed end date.
