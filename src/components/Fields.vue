<template>
    <!-- MENU START -->
    <div>
        <sidelip v-model="menu" class="text-center">
            <group-title class="bg-primary" :style="{height: '8rem', padding: '2rem 1rem'}">
                <h2>Scouting 2018</h2>
                <h4>Made by Ajusa</h4>
            </group-title>
            <cell>
                Number of forms: {{data.length}}
            </cell>
            <cell>
                <btn v-if="s.password == auth" theme="default" block @click="viewData = true">VIEW DATA</btn>
            </cell>
            <cell>
                <input-text v-model="s.name" placeholder="Name" type="text" />
            </cell>
            <cell>
                <btn block @click="saveSettings">SAVE SETTINGS</btn>
            </cell>
            <cell>
                <input-text v-model="s.password" placeholder="Password" type="password" />
            </cell>
            <group v-show="s.password == auth">
                <cell>
                    <btn theme="secondary" block @click="clear">CLEAR DATA</btn>
                </cell>
            </group>
        </sidelip>
        <slideup v-model="viewData">
            <navbar theme="default">
                <h4 slot="body">Data on Device</h4>
                <icon name="qrcode" size="lg" @click="qr" slot="footer"></icon>
            </navbar>
            <btn block theme="secondary" @click="deleteSelected()">Delete Selected Reports</btn>
            <cell v-for="(d,i) in data">
                <label class="checkbox checkbox-square">
                    <input type="checkbox" v-model="selectedData" class="checkbox-input" :value="{data: d, _id: i}">
                    <span class="checkbox-addon"><i class="fa fa-check"></i></span>
                    <span class="checkbox-label">Team: {{d.team}}, Match: {{d.match}}</span>
                </label>
                <icon name="trash" class="text-danger" size="lg" @click="remove(i)" slot="footer"></icon>
            </cell>
        </slideup>
        <navbar>
            <icon name="navicon" size="lg" @click="menu = true"></icon>
            <h4 slot="body">Scouting 2018</h4>
            <icon name="pencil-square-o" size="lg" @click="viewData = true" slot="footer"></icon>
        </navbar>
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
                Auton switch cubes &nbsp;
                <input-number :min="0" v-model="d.a_switch_cubes" :max="20" />
            </cell>
            <cell>
                Auton scale cubes &nbsp;
                <input-number :min="0" v-model="d.a_scale_cubes" :max="20" />
            </cell>
            <cell>
                Auton vault cubes &nbsp;
                <input-number :min="0" v-model="d.a_vault_cubes" :max="20" />
            </cell>
            <cell>
                Auton placing quality (1-10) &nbsp;
                <input-number :min="0" v-model="d.a_place_quality" :max="10" />
            </cell>
        </group>
        <group-title>Teleop</group-title>
        <group>
            <cell>
                <inline-selector v-model="d.pickup" multiple>
                    Cube collection: &nbsp;
                    <inline-selector-option value="loadingstation">Station</inline-selector-option>
                    <inline-selector-option value="floor">Floor</inline-selector-option>
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
        <cell id="scanner"></cell>
        <p id="scannedTextMemo"></p>
        <group v-show="showQR">
            <div id="qr"></div>
        </group>
        <br>
        <!--<code>
            {{JSON.stringify(data)}}
        </code>-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            d: {},
            default: {},
            data: [],
            menu: false,
            viewData: false,
            s: {},
            showQR: false,
            selectedData: [],
            auth: atob('Ymx1ZWJhYmllc2FyZXVuaGVhbHRoeQ==')
        }
    },
    created: function() {
        var self = this;
        this.$http.get('/fields.json').then(function(resp) {
            self.d = resp.body
            console.log(self.d)
        }, function() {

        });
        this["default"] = JSON.parse(JSON.stringify(this.d));
        this.data = store('data') || [];
        this.s = store('settings') || {
            password: '',
            name: ''
        };
    },
    methods: {
        submit: function() {
            for (var key in this.d) {
                if (this.d.hasOwnProperty(key) && typeof(this.d[key]) === "boolean") {
                    this.d[key] = this.d[key].toString()
                }
            }
            this.data.push(this.d);
            store('data', this.data);
            this.d.name = this.s.name;
            this.d = JSON.parse(JSON.stringify(this["default"]));
            this.$loading.toggle('Attempting to send...');
            this.$http.post('', this.data, { timeout: 3000 }).then((function() {
                this.$loading.toggle();
                this.clear();
                this.$alert({ message: 'Form Submitted', title: ':D', okText: 'Okay' });
            }), function() {
                this.$loading.toggle();
                this.$alert({ message: 'Form saved. There are now ' + this.data.length + ' forms saved', title: 'Could not Send', okText: 'Okay' });
            });
        },
        remove: function(i) {
            this.data.splice(i, 1)
            store('data', this.data);
            this.$toast({ position: 'bottom', message: 'Deleted report' });
        },
        deleteSelected: function() {
            for (var i = this.selectedData.length - 1; i >= 0; i--) {
                this.data.splice(this.selectedData[i]._id, 1)
            }
            store('data', this.data);
            this.$toast({ position: 'bottom', message: 'Deleted reports' });
        },
        clear: function() {
            store(false);
            this.data = [];
            this.$toast({ position: 'bottom', message: 'Stored Data Cleared' });
        },
        saveSettings: function() {
            store('settings', this.s);
            this.$toast({ position: 'bottom', message: 'Saved' });
        },
        qr: function() {
            var data = []
            for (var i = this.selectedData.length - 1; i >= 0; i--) {
                data.push(this.selectedData[i].data)
            }
            this.showQR = true;
            var str = ""
            for (var i = 0; i < data.length; i++) {
                var arr = Object.keys(data[i]).map(function(k) { return data[i][k] });
                if (i == 0) {
                    str += arr.join("|")
                } else {
                    str += arr.join("|") + "\n"
                }
            }
            createQR(str)
            console.log(str)
        },
        decodeQR: function(str) {
            arr = str.split("\n");
            for (var i = arr.length - 1; i >= 0; i--) {
                var obj = {}
                var report = arr[i].split("|")
                var keys = Object.keys(this.d)
                for (var i = report.length - 1; i >= 0; i--) {
                    obj[keys[i]] = report[i]
                }
                this.data.push(obj);
                store('data', this.data);
                this.$toast({ position: 'bottom', message: 'Scouting Data added to Device' });
            }
        },
        onDecode: function(data) {
            console.log(data)
        }
    }
}
</script>