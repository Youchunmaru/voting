<script lang="ts">


    import VotePersist from "./util/VotePersist";

    let {onCreation} : {onCreation: () => void} = $props();

    let name = $state("");
    let candidates : string[] = $state([])
    let votes = $state(1);

    const onclick = function (evt: MouseEvent)  {
        evt.preventDefault();
        VotePersist.persistVoting(name, candidates, votes);
        onCreation();
    }
    let candidate = $state("")
    const addCandidate = function (evt: MouseEvent) {
        evt.preventDefault();
        candidates.push(candidate)
    }
    const removeCandidate = (it: string) => {
        return function (evt: MouseEvent) {
            evt.preventDefault();
            candidates = candidates.filter(itCandidate => itCandidate !== it);
        }
    }

</script>

<form class="create">
    <div class="input">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" bind:value={name}>
    </div>
    <div class="input">
        <label for="votes">Votes: </label>
        <input type="number" name="votes" id="votes" bind:value={votes}>
    </div>
    <div class="input">
        <input type="text" name="candidate" id="candidate" bind:value={candidate}>
        <button onclick={addCandidate}>+</button>
    </div>
    {#each candidates as it}
        <div class="input">
            <p>{it}</p>
            <button style="width: min-content; justify-self: end" onclick={removeCandidate(it)}>-</button>
        </div>
    {/each}
    <button {onclick}>Submit</button>
</form>


<style>
    .create {
        display: grid;
        grid-auto-flow: row;
        border-radius: 1em;
        margin: 1em;
        padding: 1em;
        border-color: #646cff;
        border-style: solid;
        border-width: 1px;
        width: 100%;
        height: 100%;
    }
    input{
        border-color: #1a1a1a;
        border-style: solid;
        border-width: 1px;
        border-radius: 0.5em;
    }
    .input {
        display: grid;
        grid-auto-flow: column;
        border-radius: 1em;
        text-align: center;
        margin-bottom: 1em;
        grid-gap: 0.5em;
    }
</style>