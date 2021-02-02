<template>
    <div>
        <navbar>
            <icon name="bars" size="lg" @click="menu = true"></icon>
            <h4 slot="body">Scouting 2020</h4>
            <icon name="edit" size="lg" @click="viewData = true" slot="footer"></icon>
        </navbar>
        <sidelip v-model="menu" class="text-center">
            <group-title class="bg-primary" :style="{height: '8rem', padding: '2rem 1rem'}">
                <h2>Scouting 2020</h2>
                <h4>Created by Arham Jain</h4>
            </group-title>
            <cell>
                Number of forms: {{$root.reports.length}}
            </cell>
            <cell v-if="$root.settings.password == auth">
                <btn theme="default" block @click="viewData = true">VIEW DATA</btn>
            </cell>
            <cell>
                <input-text v-model="$root.settings.name" placeholder="Name" type="text" />
            </cell>
            <cell>
                <btn block @click="save">SAVE SETTINGS</btn>
            </cell>
            <cell>
                <input-text v-model="$root.settings.password" placeholder="Password" type="password" />
            </cell>
            <group v-show="$root.settings.password == auth">
                <cell>
                    <btn theme="secondary" block @click="$root.clear">CLEAR DATA</btn>
                </cell>
            </group>
        </sidelip>
        <slideup v-model="viewData">
            <navbar theme="default">
                <h4 slot="body">Data on Device</h4>
            </navbar>
            <btn block theme="secondary" @click="deleteSelected()">Delete Selected Reports</btn>
            <cell v-for="(r,i) in $root.reports" :key="i">
                <label class="checkbox checkbox-square">
                    <input type="checkbox" v-model="selectedData" class="checkbox-input" :value="{data: r, _id: i}">
                    <span class="checkbox-addon"><i class="fa fa-check"></i></span>
                    <span class="checkbox-label">Team: {{r.team}}, Match: {{r.match}}</span>
                </label>
                <icon name="trash" class="text-danger" size="lg" @click="remove(i)" slot="footer"></icon>
            </cell>
        </slideup>
    </div>
</template>
<script>
import store from "store2"
export default {
    data() {
        return {
            menu: false,
            auth: atob('Ymx1ZWJhYmllc2FyZXVuaGVhbHRoeQ=='),
            viewData: false,
            selectedData: [],
        }
    },
    methods: {
        save() {
            store('settings', this.$root.settings);
            this.$toast({ position: 'bottom', message: 'Saved' });
        },
        remove(i) {
            this.$root.reports.splice(i, 1)
            store('data', this.$root.reports);
            this.$toast({ position: 'bottom', message: 'Deleted report' });
        },
        deleteSelected() {
            for (var i = this.selectedData.length - 1; i >= 0; i--) {
                this.$root.reports.splice(this.selectedData[i]._id, 1)
            }
            store('data', this.$root.reports);
            this.$toast({ position: 'bottom', message: 'Deleted reports' });
        }
    }
}
</script>