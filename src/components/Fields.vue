<template>
    <!-- MENU START -->
    <div>    
        <div class="group-title">Info</div>
        <group>
            <cell>
                <input-text v-model="d.match" placeholder="Match Number" type="number" />
            </cell>
            <cell>
                <input-text v-model="d.team" placeholder="Team Number" type="number" />
            </cell>
            <cell>
                <inline-selector v-model="d.color">
                    Alliance: &nbsp;
                    <inline-selector-option value="red"><span class="blue">Blue</span></inline-selector-option>
                    <inline-selector-option value="blue"><span class="red">Red</span></inline-selector-option>
                </inline-selector>
            </cell>
        </group>
        <group-title>Auton</group-title>
        <group>
            <cell>
                <inline-selector v-model="d.a_start_pos">
                    Start position: &nbsp;
                    <inline-selector-option value="left">Left</inline-selector-option>
                    <inline-selector-option value="middle">Middle</inline-selector-option>
                    <inline-selector-option value="right">Right</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                <inline-selector v-model="d.a_movement">
                    Movement: &nbsp;
                    <inline-selector-option value="moves">Moves</inline-selector-option>
                    <inline-selector-option value="cross">Crosses Line</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                <inline-selector v-model="d.a_shoot_spot">
                    Auton Robot Shooting Spot: &nbsp;
                <inline-selector-option value="Lower">Lower</inline-selector-option>
                <inline-selector-option value="Outer">Outer</inline-selector-option>
                <inline-selector-option value="Inner">Inner</inline-selector-option>
            </cell>
            <cell>
                Auton shoot accuracy &nbsp;
                <input-number :min="0" v-model="d.a_scale_cubes" :max="100" />
            </cell>
            <cell>
                Auton type &nbsp;
                <input-text v-model="d.a_type" placeholder="Auton Type" type="text" />
            </cell>
            <cell>
                Auton Behavior &nbsp;
                <input-text v-model="d.a_behavior" placeholder="Auton Behavior" type="text" />
            </cell>
            <cell>
                Auton End Behavior &nbsp;
                    <input-text v-model="d.a_end_behavior" placeholder="Auton End Behavior" type="text" />
            </cell>
        </group>
        <group-title>Teleop</group-title>
        <group>
            <cell>
                <inline-selector v-model="d.t_spot" multiple>
                    Shooting Area: &nbsp;
                    <inline-selector-option value="Lower">Lower</inline-selector-option>
                    <inline-selector-option value="Outer">Outer</inline-selector-option>
                    <inline-selector-option value="Inner">Inner</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                Switch cubes &nbsp;
                <input-number :min="0" v-model="d.switch_cubes" :max="20" />
            </cell>
            <cell>
                Scale cubes &nbsp;
                <input-number :min="0" v-model="d.scale_cubes" :max="20" />
            </cell>
            <cell>
                Switch cubes failed &nbsp;
                <input-number :min="0" v-model="d.switch_cubes_failed" :max="20" />
            </cell>
            <cell>
                Scale cubes failed &nbsp;
                <input-number :min="0" v-model="d.scale_cubes_failed" :max="20" />
            </cell>
            <cell>
                Cubes placed for vault &nbsp;
                <input-number :min="0" v-model="d.vault_cubes" :max="20" />
            </cell>
            <cell>
                <checkbox v-model="d.defensive">Defensive</checkbox>
            </cell>
            <cell>
                Cubes on opponent switch &nbsp;
                <input-number :min="0" v-model="d.def_cubes" :max="20" />
            </cell>
            <cell>
                Fouls &nbsp;
                <input-number :min="0" v-model="d.foul_number" :max="20" />
            </cell>
            <cell>
                <inline-selector v-model="d.foul_type" multiple>
                    Foul type: &nbsp;
                    <inline-selector-option value="Tech">Tech</inline-selector-option>
                    <inline-selector-option value="Yellow">Yellow</inline-selector-option>
                    <inline-selector-option value="Red">Red</inline-selector-option>
                </inline-selector>
            </cell>
        </group>
        <group-title>End Game</group-title>
        <group>
            <cell>
                <inline-selector v-model="d.hang">
                    Hang: &nbsp;
                    <inline-selector-option value="attempt">Attempt</inline-selector-option>
                    <inline-selector-option value="success">Success</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                Time to hang (s) &nbsp;
                <input-number :min="0" v-model="d.time_to_hang" :step="5" :max="30"></input-number>
            </cell>
            <cell>
                <checkbox v-model="d.hanged_on_other">Hangs on other robot</checkbox>
            </cell>
            <cell>
                Carries (#) robots &nbsp;
                <input-number :min="0" v-model="d.carry_number" :max="20" />
            </cell>
            <cell>
                Number of other robots hanging &nbsp;
                <input-number :min="0" v-model="d.endrobothangtotal" :max="2" />
            </cell>
        </group>
        <group-title>Humans</group-title>
        <group>
            <cell>
                <inline-selector v-model="d.driver">
                    Driver: &nbsp;
                    <inline-selector-option value="low">Bad</inline-selector-option>
                    <inline-selector-option value="mid">Avg</inline-selector-option>
                    <inline-selector-option value="high">Good</inline-selector-option>
                </inline-selector>
            </cell>
        </group>
        <group>
            <cell class="no-padding">
                <input-textarea v-model="d.comments" placeholder="Additional Comments" />
            </cell>
        </group>
        <cell>
            <btn block size="lg" @click="submit">SUBMIT</btn>
        </cell>
        <br>
        <!--<code>
            {{JSON.stringify(data)}}
        </code>-->
    </div>
</template>
<script>
import store from "store2"
export default {
    //these parse and stringify because require turned all of my false into "false"
    data() {
        return {
            d: JSON.parse(JSON.stringify(require("../fields.json"))),
            menu: false,
            default: JSON.parse(JSON.stringify(require("../fields.json")))
        }
    },
    methods: {
        submit: function() {
            //I think I added this line so that the output CSV didn't have 1 and 0 as the output, and actual string instead
            for (var key in this.d) {
                if (this.d.hasOwnProperty(key) && typeof(this.d[key]) === "boolean") {
                    this.d[key] = this.d[key].toString() 
                }
            }
            this.d.name = this.$root.settings.name;
            this.$root.reports.push(this.d);
            store('data', this.$root.reports);
            this.d = JSON.parse(JSON.stringify(this["default"]));
            this.$loading.toggle('Attempting to send...');
            this.$http.post('/api', this.$root.reports, { timeout: 3000 }).then((function() {
                this.$loading.toggle();
                this.$root.clear();
                this.$alert({ message: 'Form Submitted', title: ':D', okText: 'Okay' });
            }), function() {
                this.$loading.toggle();
                this.$alert({ message: 'Form saved. There are now ' + this.$root.reports.length + ' forms saved', title: 'Could not Send', btns: [{text:'Okay'}]});
            });
        }
    }
}
</script>