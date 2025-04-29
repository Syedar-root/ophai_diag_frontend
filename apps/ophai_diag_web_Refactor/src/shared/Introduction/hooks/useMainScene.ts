import {ref} from 'vue'
export const useMainScene = () => {
  const topic1 = ref<HTMLDivElement|null>(null)
  const topic2 = ref<HTMLDivElement|null>(null)
  const topic3 = ref<HTMLDivElement|null>(null)
  const topic4 = ref<HTMLDivElement|null>(null)
  const topicShows = ref<boolean[]>([false, false, false, false])

  const mouseOverHandlers = [
	(event: MouseEvent) => handleMouseOver(event, topic1.value),
	(event: MouseEvent) => handleMouseOver(event, topic2.value),
	(event: MouseEvent) => handleMouseOver(event, topic3.value),
	(event: MouseEvent) => handleMouseOver(event, topic4.value)
  ]

  const mouseOutHandlers = [
	() => handleMouseOut(topic1.value),
	() => handleMouseOut(topic2.value),
	() => handleMouseOut(topic3.value),
	() => handleMouseOut(topic4.value)
  ]

  function initTopics(topics : HTMLDivElement[]) {
	topics.forEach((topic, index) => {
	  topic?.addEventListener('mousemove', mouseOverHandlers[index])
	  topic?.addEventListener('mouseleave', mouseOutHandlers[index])
	})
  }


  const handleMouseOver = (event: MouseEvent, el: HTMLDivElement | null) => {
	if (!el) return;
	requestAnimationFrame(()=>{
	  const { clientX, clientY } = event;
	  const { left, top, width, height } = el.getBoundingClientRect();
	  const centerX = left + width / 2;
	  const centerY = top + height / 2;
	  const distanceX = clientX - centerX;
	  const distanceY = clientY - centerY;
	  const radius = width / 2;
	  const ballContainer = el.querySelector('.ball-container') as HTMLDivElement;
	  const mainBall = el.querySelector('.main-ball') as HTMLDivElement;
	  if (distanceX < radius && distanceY < radius && mainBall) {
		ballContainer.style.transition = "transform 0.1s";
		ballContainer.style.transform = `translate(${distanceX / 3}px, ${distanceY / 3}px)`;
		mainBall.style.setProperty(`--meltX`, `${distanceX/1.2 }px`);
		mainBall.style.setProperty(`--meltY`, `${distanceY/1.2 }px`);
		mainBall.style.setProperty(`--meltDuration`, `0.1s`);
	  }
	})
  }

  function handleMouseOut(el: HTMLDivElement | null) {
	if (!el) return;
	const ballContainer = el.querySelector('.ball-container') as HTMLDivElement;
	const mainBall = el.querySelector('.main-ball') as HTMLDivElement;
	ballContainer.style.transition = "transform 0.5s";
	ballContainer.style.transform = 'translate(0, 0)';
	mainBall.style.setProperty(`--meltX`, `0px`);
	mainBall.style.setProperty(`--meltY`, `0px`);
	mainBall.style.setProperty(`--meltDuration`, `0.5s`);
  }

  return {
    topic1,
    topic2,
    topic3,
    topic4,
	topicShows,
    handleMouseOver,
    handleMouseOut,
	initTopics,
	mouseOverHandlers
  }
}
