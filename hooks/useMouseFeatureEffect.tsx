import { useEffect } from 'react';

export const useMouseFeatureEffect = (class1: any, class2: any) => {
	useEffect(() => {
		const featuresEl: HTMLDivElement | null = document.querySelector(class1);
		const featureEls: NodeListOf<HTMLDivElement> = document.querySelectorAll(class2);

		if (featuresEl) {
			const handlePointerMove = (ev: PointerEvent) => {
				featureEls.forEach((featureEl) => {
					const rect = featureEl.getBoundingClientRect();
					featureEl.style.setProperty('--x', `${ev.clientX - rect.left}`);
					featureEl.style.setProperty('--y', `${ev.clientY - rect.top}`);
				});
			};

			const handleMouseLeave = () => {
				featureEls.forEach((featureEl) => {
					featureEl.style.setProperty('--x', '-9999px');
					featureEl.style.setProperty('--y', '-9999px');
				});
			};

			featuresEl.addEventListener('pointermove', handlePointerMove);
			featuresEl.addEventListener('mouseleave', handleMouseLeave);

			return () => {
				featuresEl.removeEventListener('pointermove', handlePointerMove);
				featuresEl.removeEventListener('mouseleave', handleMouseLeave);
			};
		}
	}, [class1, class2]);
};
