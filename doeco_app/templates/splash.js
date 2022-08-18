var xmlns = "http://www.w3.org/2000/svg",
xlinkns = "http://www.w3.org/1999/xlink",
select = function(s) {
  return document.querySelector(s);
},
selectAll = function(s) {
  return document.querySelectorAll(s);
},
  liquid = selectAll('.liquid'),
  tubeShine = select('.tubeShine'),
  label = select('.label'),
  follower = select('.follower'),
  dragger = select('.dragger'),
  dragTip = select('.dragTip'),
  minDragY = -100,
  liquidId = -340,
  step = Math.abs(minDragY/100),
  snap = Math.abs(minDragY/10),
  followerVY = 0


TweenMax.set('svg', {
visibility: 'visible'
})

TweenMax.set(dragTip, {
transformOrigin:'20% 50%'
})

var tl = new TimelineMax()
tl.staggerTo(liquid, 0.7, {
x:'-=200',
ease:Linear.easeNone,
repeat:-1
},0.9)

tl.time(100);


function onUpdate(){
liquidId = Math.abs(Math.round(dragger._gsTransform.y/step));

label.textContent = liquidId + '°';
TweenMax.to(liquid, 1.3, {
y:-dragger._gsTransform.y*2.7,
ease:Elastic.easeOut.config(1,0.4)
})

}

TweenMax.to(dragger, 3, {
y:minDragY,
onUpdate:onUpdate,
ease:Expo.easeInOut
})


//ScrubGSAPTimeline(tl);