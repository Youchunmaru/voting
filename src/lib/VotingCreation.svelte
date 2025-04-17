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
    <label for="name">Name:</label>
    <input type="text" name="name" id="name" bind:value={name}>
    <label for="votes">Votes: </label>
    <input type="number" name="votes" id="votes" bind:value={votes}>
        <input type="text" name="candidate" id="candidate" bind:value={candidate}>
        <button onclick={addCandidate}>+</button>
    {#each candidates as it}
            <p>{it}</p>
            <button onclick={removeCandidate(it)}>-</button>
    {/each}
    <input {onclick} type="submit" value="Submit">
</form>


<style>
    .create {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>