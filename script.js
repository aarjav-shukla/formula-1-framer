const canvas = document.querySelector("canvas");
console.log(canvas);
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(onupdate);

const frames = {
  currentindex: 0,
  maxindex: 356,
};

let imagesloaded = 0;
let images = [];
const context = canvas.getContext("2d");

function preload() {
  for (let i = 1; i <= frames.maxindex; i++) {
    const imageurl = `./latest frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imageurl;
    img.onload = () => {
      imagesloaded++;
      if (imagesloaded === frames.maxindex) {
        // console.log("all images loaded");
        loadimage(frames.currentindex);
        animation();
      }
    };
    images.push(img);
  }
}

function loadimage(index) {
  if (index >= 0 && index <= frames.maxindex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newwidth = img.width * scale;
    const newheight = img.height * scale;

    const offsetx = (canvas.width - newwidth) / 2;
    const offsety = (canvas.height - newheight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetx, offsety, newwidth, newheight);
    frames.currentindex = index;
  }
}

function animation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",

      scrub: 2,
    },
  });

  function updateframe(index){
    return {
      currentindex:index,
      onUpdate: () => {
        loadimage(Math.floor(frames.currentindex));
      },
    };
  }
  
  tl.to(frames, updateframe(100),"first")
  tl.to(".logo",{opacity:0,ease:"linear"},"first")

  tl.to(frames,updateframe(150),"second")
  tl.to(".animate2",{opacity:1,ease:"linear"},"second")


    tl.to(frames, updateframe(300), "third");
    tl.from(".animate3", { x:300, ease: "linear", }, "third");
    tl.to(".animate2", { opacity: 0, ease: "linear" }, "third");

     tl.to(frames, updateframe(frames.maxindex));


}
preload();
