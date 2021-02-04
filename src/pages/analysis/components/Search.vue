<template>

    <!-- MENU START -->
    <div class="center">
        <form id="search_querry">
            <input class="input-text" type="text" placeholder="Search for teams" aria-label="Search">
            <btn class="bttn" block size="lg" @click="submit">Search</btn>
        </form>
    </div>
</template>

<script>
    const searchQuerry = document.getElementById('search_querry');
</script>

<style>
    .input-text {
        width: 500px;
        height: 30px;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
    }
</style>