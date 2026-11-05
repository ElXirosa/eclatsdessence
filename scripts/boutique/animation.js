import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from("header", {
    y:40,
    opacity: 0,
    duration: 0.7,
    ease: "back.out(1.4)"
});

gsap.from(".hero-left h1", {
    y:40,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 0.3
});

gsap.from(".hero-left p, .hero-sep", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.6,
    stagger: 0.15
});

gsap.from(".hero-stats .h-stat", {
    scale: 0.7,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(2)",
    delay: 0.7,
    stagger: 0.12
});

export function animateCards(){
    gsap.from(".p-card", {
        scrollTrigger: {
            trigger: ".grid-view",
            start: "top 85%",
        },
        y: 50,
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.5)",
        stagger: 0.07
    });
}