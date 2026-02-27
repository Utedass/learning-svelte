<script lang="ts">
	import { Accordion, Popover, Portal, Avatar } from '@skeletonlabs/skeleton-svelte';
	import { CalendarIcon, CircleUserIcon, MenuIcon, XIcon, SearchIcon } from '@lucide/svelte';

	let value = $state(['1']);
</script>

<h1 class="h1">Try Stuff</h1>
Is this alive?

<Accordion {value} onValueChange={(details) => (value = details.value)}>
	{#each ['1', '2', '3'] as item (item)}
		<Accordion.Item value={item}>
			<h3 class="card preset-filled-tertiary-100-900 h3">
				<Accordion.ItemTrigger>Item {item}</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>Content for item {item}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>

<hr class="hr border-t-8" />

<Popover>
	<Popover.Trigger class="btn preset-tonal-secondary">Trigger</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content class="w-96 card bg-surface-300-700 p-4 shadow-xl ">
				<div class="space-y-4">
					<header class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
						<Avatar>
							<Avatar.Image
								src="https://cdn.bsky.app/img/avatar/plain/did:plc:whtgi5zx7ylmdw2i76vq7vq4/bafkreibgoxuqahwcpiah22yfovqszh33x2u4sysmqoyuk5j54aoakt7364@jpeg"
								alt="Skeleton Labs"
							/>
						</Avatar>
						<div>
							<Popover.Title class="text-lg font-bold">Skeleton Labs</Popover.Title>
							<a href="https://bsky.app/profile/skeleton.dev" target="_blank" class="anchor"
								>@skeletonlabs.dev</a
							>
						</div>
						<Popover.CloseTrigger class="btn-icon self-start hover:preset-tonal">
							<XIcon class="size-4" />
						</Popover.CloseTrigger>
					</header>
					<Popover.Description
						>Your friendly neighborhood open source maintainers. Creators of Skeleton.</Popover.Description
					>
					<div class="flex gap-4">
						<p class="text-sm">800 <span class="opacity-60">Followers</span></p>
						<p class="text-sm">120 <span class="opacity-60">Following</span></p>
						<p class="text-sm">100 <span class="opacity-60">Posts</span></p>
					</div>
				</div>
				<Popover.Arrow
					class="[--arrow-background:var(--color-surface-100-900)] [--arrow-size:--spacing(2)]"
				>
					<Popover.ArrowTip />
				</Popover.Arrow>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
<hr class="hr border-t-8" />
<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal"><MenuIcon /></button>
<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal"><CircleUserIcon /></button>
