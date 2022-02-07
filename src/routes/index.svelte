<script lang="ts">
import "@adorable.css"
import "../style.css"
import Header from "../components/Header.svelte"
import KeyButton from "../components/KeyButton.svelte"
import {WORDS} from "../const/5words"

const MAX_WORD_COUNT = 5


const key1 = "qwertyuiop".split("")
const key2 = "asdfghjkl".split("")
const key3 = "zxcvbnm".split("")

//
// const answer = "teoyu"
const answer = WORDS[Math.floor(Math.random() * WORDS.length)]

let allLetters = Array(6).fill(null).map(() => [])
let matchedLetters = Object.create(null)
let currentStep = 0

const getCurrentLetters = () => allLetters[currentStep]

const matchWordle = (answer:string, guess:string) => {

  return guess.split("").map((char, i) => {
    const type = (() => {
      if (char === answer[i]) {
        return "correct"
      }
      else if (answer.includes(char)) {
        return "present"
      }
      return "absent"
    })()

    return {
      char,
      type,
    }
  })
}


// 글자 입력
const pushLetter = (char:string) => {
  const letters = getCurrentLetters()
  if (letters.length >= MAX_WORD_COUNT) {
    return
  }

  allLetters[currentStep] = [...letters, {char, type: ""}]
}

// 백스페이스 - 글자삭제
const backspace = () => {
  const letters = getCurrentLetters()
  allLetters[currentStep] = letters.slice(0, -1)
}

// 엔터
const enter = () => {
  const letters = getCurrentLetters()
  if (letters.length < MAX_WORD_COUNT) {
    return
  }

  // 입력된 글자를 통해 단어를 찾는다.
  const input = letters.map(({char}) => char).join("")
  allLetters[currentStep] = matchWordle(answer, input)

  // 매칭된 글자를 저장한다.
  allLetters[currentStep].forEach(({char, type}) => {
    if (matchedLetters[char] === "correct") {
      return
    }
    matchedLetters[char] = type
  })

  // 다음 단계로 이동
  currentStep++
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

  <Header/>

  <!-- Words -->
  <div class="flex pack uppercase">
    <div class="vbox gap(5)">
      {#each allLetters as row, step}
        <div class="hbox gap(5)">
          {#each Array(5) as _, index}
            <div class="b(2/--color-tone-4) w(62) h(62) pack font(30) bold
            .absent:bg(--color-absent) .absent:c(#fff) .absent:b(none)
            .correct:bg(--color-correct) .correct:c(#fff) .correct:b(none)
            .present:bg(--color-present) .present:c(#fff) .present:b(none)
            {row[index]?.type}">{row[index]?.char ?? ''}</div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <!-- Keyboard -->
  <div class="vbox gap(8) p(8) uppercase">
    <div class="hbox gap(6)">
      {#each key1 as key}
        <KeyButton on:click={() => pushLetter(key)} type={matchedLetters[key]}>{key}</KeyButton>
      {/each}
    </div>

    <div class="hbox gap(6)">
      <div class="flex(.4)"/>
      {#each key2 as key}
        <KeyButton on:click={() => pushLetter(key)} type={matchedLetters[key]}>{key}</KeyButton>
      {/each}
      <div class="flex(.4)"/>
    </div>

    <div class="hbox gap(6)">
      <KeyButton class="flex(1.5)" tabindex="-1">ENTER</KeyButton>
      {#each key3 as key}
        <KeyButton on:click={() => pushLetter(key)} type={matchedLetters[key]}>{key}</KeyButton>
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