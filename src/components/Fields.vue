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
                <checkbox v-model="d.a_movement">Moves off line</checkbox>
            </cell>
            <cell>
                <checkbox v-model="d.a_score">The robot scores balls</checkbox>
            </cell>
            <cell>
                <inline-selector v-model="d.a_port" multiple>
                    Ball Port Scored In: &nbsp;
                    <inline-selector-option value="high">High</inline-selector-option>
                    <inline-selector-option value="low">Low</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                Auton Score Accuracy &nbsp;
                <input-number :min="0" v-model="d.a_accuracy" :max="100" />
            </cell>
        </group>
        <group-title>Teleop</group-title>
        <group>
            <cell>
                <inline-selector v-model="d.t_pickup" multiple>
                    Ball collection: &nbsp;
                    <inline-selector-option value="loadingstation">Station</inline-selector-option>
                    <inline-selector-option value="floor">Floor</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                Ball Capacity &nbsp;
                <input-number :min="0" v-model="d.t_ball_cap" :max="10" />
            </cell>
            <cell>
                <inline-selector v-model="d.t_port" multiple>
                    Ball Port Scored In: &nbsp;
                    <inline-selector-option value="high">High</inline-selector-option>
                    <inline-selector-option value="low">Low</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                Ball Score Accuracy &nbsp;
                <input-number :min="0" v-model="d.t_accuracy" :max="100" />
            </cell>
            <cell>
                <checkbox v-model="d.t_trench_run">Robot can do Trench Run</checkbox>
            </cell>
            <cell>
                Trench Runs Made &nbsp;
                <input-number :min="0" v-model="d.t_trench_runs_made" :max="50" />
            </cell>
            <cell>
                <checkbox v-model="d.t_through_generator">Robot moves through Generator</checkbox>
            </cell>
            <cell>
                <checkbox v-model="d.t_cp_spin_2_win">Robot can spin control panel</checkbox>
            </cell>
            <cell>
                Control Panel Spins &nbsp;
                <input-number :min="0" v-model="d.t_cp_spins" :max="50" />
            </cell>

            <cell>
                <checkbox v-model="d.defensive">Defensive</checkbox>
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
                <inline-selector v-model="d.e_hang">
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
                <inline-selector v-model="d.e_hang_loc">
                    Hang Side: &nbsp;
                    <inline-selector-option value="close">Close</inline-selector-option>
                    <inline-selector-option value="middle">Middle</inline-selector-option>
                    <inline-selector-option value="far">Far</inline-selector-option>
                </inline-selector>
            </cell>
            <cell>
                Number of other robots hanging &nbsp;
                <input-number :min="0" v-model="d.e_robot_hang_total" :max="2" />
            </cell>
            <cell>
                <checkbox v-model="d.e_balanced">Generator Switch Balanced</checkbox>
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