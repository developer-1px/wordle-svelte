<script lang="ts">
import "@adorable.css"
import "../style.css"
import KeyButton from "../components/KeyButton.svelte"

const MAX_WORD_COUNT = 5

const help = () => {}
const statistics = () => {}
const settings = () => {}

const key1 = "qwertyuiop".split("")
const key2 = "asdfghjkl".split("")
const key3 = "zxcvbnm".split("")

//
const answer = "teoyu"

const matchWordle = (answer:string, guess:string) => {

  console.log("matchWordle", answer, guess)

  return guess.split("").map((char, i) => {
    let type = "absent"
    if (char === answer[i]) {
      type = "correct"
    }
    else if (answer.includes(char)) {
      type = "present"
    }

    return {
      char,
      type,
    }
  })
}

let letters = []

// 글자 입력
const pushLetter = (char:string) => {
  if (letters.length >= MAX_WORD_COUNT) return
  letters = [...letters, {char, type: ""}]
}

// 백스페이스 - 글자삭제
const backspace = () => {
  letters = letters.slice(0, -1)
}

// 엔터
const enter = () => {
  if (letters.length < MAX_WORD_COUNT) return
  letters = matchWordle(answer, letters.map(({char}) => char).join(""))
}

// 키를 누르면 키입력 전달
const onkeydown = (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return
  }

  if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
    pushLetter(event.key)
  }
  else if (event.key === "Backspace") {
    backspace()
  }
  else if (event.key === "Enter") {
    enter()
  }
}
</script>


<div class="vbox h(100%) w(320~500) m(auto)">

  <!-- Header -->
  <div class="hbox relative h(50) bb(#ccc)">
    <div class="flex">
      <button class="w(32)" on:click={help}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path fill="var(--color-tone-3)" d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
        </svg>
      </button>
    </div>

    <div class="flex clip">
      <h1 class="layer pack font(36/-/4) 700">WORDLE</h1>
    </div>

    <button class="w(32)" on:click={statistics}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path fill="var(--color-tone-3)" d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"></path>
      </svg>
    </button>

    <button class="w(32)" on:click={settings}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path fill="var(--color-tone-3)" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path>
      </svg>
    </button>
  </div>

  <!-- Words -->
  <div class="flex pack uppercase">
    <div class="vbox gap(5)">
      <div class="hbox gap(5)">
        {#each Array(5) as row, index}
          <div class="b(2/--color-tone-4) w(62) h(62) pack font(30) bold
            .absent:bg(--color-absent) .absent:c(#fff) .absent:b(none)
            .correct:bg(--color-correct) .correct:c(#fff) .correct:b(none)
            .present:bg(--color-present) .present:c(#fff) .present:b(none)
            {letters[index]?.type}">{letters[index]?.char ?? ''}</div>
        {/each}
      </div>

      {#each Array(5) as row}
        <div class="hbox gap(5)">
          {#each Array(5) as row, index}
            <div class="b(2/--color-tone-4) w(62) h(62) pack font(30) bold"></div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <!-- Keyboard -->
  <div class="vbox gap(8) p(8) uppercase">
    <div class="hbox gap(6)">
      {#each key1 as key}
        <KeyButton on:click={() => pushLetter(key)}>{key}</KeyButton>
      {/each}
    </div>

    <div class="hbox gap(6)">
      <div class="flex(.4)"/>
      {#each key2 as key}
        <KeyButton on:click={() => pushLetter(key)}>{key}</KeyButton>
      {/each}
      <div class="flex(.4)"/>
    </div>

    <div class="hbox gap(6)">
      <KeyButton class="flex(1.5)" tabindex="-1">ENTER</KeyButton>
      {#each key3 as key}
        <KeyButton on:click={() => pushLetter(key)}>{key}</KeyButton>
      {/each}
      <KeyButton class="flex(1.5)" tabindex="-1" on:click={backspace}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
      </KeyButton>
    </div>
  </div>

</div>

<svelte:head>
  <title>테오의 프론트엔드 - Wordle Challenge</title>
</svelte:head>

<svelte:window on:keydown={onkeydown}/>