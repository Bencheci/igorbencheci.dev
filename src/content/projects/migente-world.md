---
title: MiGente.World, a global fan experience for J Balvin's "Mi Gente"
summary: 'An interactive globe that mapped every #MiGente photo and video by city, with a custom photo frame and live reach stats. Shorty Awards finalist in three categories.'
seoTitle: "MiGente.World fan globe for J Balvin"
seoDescription: "An interactive globe that mapped every #MiGente photo and video by city, with a photo frame and live reach stats. Shorty Awards finalist in three categories."
period: '2017'
order: 102
kind: earlier
cardTitle: "MiGente.World"
cardLine: "Shorty Awards finalist ×3 · J Balvin's global fan experience"
role: Developer, built the full site experience
industry: Music & entertainment
stack: [Interactive 3D globe, Social media APIs, FFmpeg microservice, tracking.js, Live stats]
category: [Campaigns]
award: Shorty Awards finalist, Multicultural Community Engagement · Photo & Video · Entertainment
images:
  - { src: /img/work/migente-carousel.webp, alt: 'MiGente.World post carousel: a fan post from Colombia featuring J Balvin on stage' }
  - { src: /img/work/migente-globe.webp, alt: 'MiGente.World globe covered in #MiGente post pins, focused on Colombia' }
  - { src: /img/work/migente-stats.webp, alt: 'Live stats page: YouTube views, total posts, cities and countries' }
video: wnJ6LuUFpMo
metrics:
  - { value: '431K+', label: '#migente posts from 134 countries' }
  - { value: '15K+', label: framed fan photos in the first week }
  - { value: '1B', label: YouTube views for the music video in about 100 days }
links:
  - { label: Shorty Awards entry, href: 'https://shortyawards.com/10th/migenteworld' }
---

Universal Music Latin wanted to show how far "Mi Gente" had travelled and get fans to share their own
moments with it. #MiGente had grown beyond the song into a cultural identifier, so the site was built
around it: a rotating globe pinned every public #MiGente photo and video to its city, and clicking a pin
opened the post. Fans could upload their own photo through a custom "Mi Gente" frame and share it with
a pre-filled message, while the top bar showed live stats on the song's reach.

I built the experience end to end, including a small FFmpeg microservice behind the photo frame: it took
each fan's selfie, composited the Mi Gente frame and logo over it, and returned an image ready to share.
It handled 15K+ framed photos in the first week.

The site launched in October 2017, the same month the "Mi Gente" video passed a billion YouTube views,
about 100 days after release. It ran with no paid media; most
traffic came from J Balvin's own Instagram.

## Follow-up: "Machika"

After MiGente, Universal brought us back for J Balvin's next single, "Machika". I built another web AR
experience: fans opened their camera on the site, tracking.js followed their face in the live video and
attached the song's signature eyeballs to it, and they could snap the shot. The same FFmpeg service
composited the final image so fans could download it or share it.
