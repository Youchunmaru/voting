<script lang="ts">
   import {VoteEnum} from "../util/VoteEnum";

   let {name, vote = $bindable(VoteEnum.REFRAIN)} : {name: string, vote: VoteEnum} = $props()

</script>

<div class="vote">
    <p>{name}: </p>
    <input type="radio" name="vote_{name}" id="yes_{name}" bind:group={vote} value={VoteEnum.YES} /> <label for="yes_{name}">Yes</label>
    <input type="radio" name="vote_{name}" id="no_{name}" bind:group={vote} value={VoteEnum.NO} /> <label for="no_{name}">No</label>
    <input checked type="radio" name="vote_{name}" id="refrain_{name}" bind:group={vote} value={VoteEnum.REFRAIN} /> <label for="refrain_{name}">Refrain</label>

</div>

<style>
    .vote {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1em;
        margin: 1em;
        padding: 1em;
        background-color: #1a1a1a;
        border-radius: 1em;
    }
</style>