<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/cn.js';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'vertical',
		...restProps
	}: ScrollAreaPrimitive.ScrollbarProps = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
	bind:ref
	{orientation}
	class={cn(
		'flex touch-none select-none transition-all duration-150',
		'data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100',
		orientation === 'vertical' && 'absolute right-0 top-0 h-full w-2 p-px',
		orientation === 'horizontal' && 'absolute bottom-0 left-0 h-2 w-full flex-col p-px',
		className
	)}
	{...restProps}
>
	<ScrollAreaPrimitive.Thumb class="relative flex-1 rounded-full bg-black/30" />
</ScrollAreaPrimitive.Scrollbar>
