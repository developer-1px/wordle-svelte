<script lang="ts">
export let type = ""
</script>

<div class="flex pack h(58) bg(#ccc) r(4) font(13) bold bg(--key-bg) nowrap pointer
            .absent:bg(--color-absent) .absent:c(#fff) .absent:b(none)
            .correct:bg(--color-correct) .correct:c(#fff) .correct:b(none)
            .present:bg(--color-present) .present:c(#fff) .present:b(none)
    {type} {$$props.class||''}" on:click>
  <slot/>
</div>