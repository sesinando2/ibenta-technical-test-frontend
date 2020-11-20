<template>
    <div class="row">
        <add-user></add-user>
        <user-table type="hover" :userlist="name"></user-table>  
    </div>
</template>
<script>
import axios from 'axios'
import AddUser from '@/components/AddUser.vue'
import UserTable from '@/components/UserTable.vue'
export default {
    components: {
        AddUser,
        UserTable
    },
    data() {
        return {
            allusers: [],
            name: [],
            test: null
        }
    },
    created(){
       this.getAllUser();
        
    },
    methods:{
        getAllUser(){
             const self=this
            // fetch('http://localhost:9000/oauth/tokens')
            // .then(response =>response.json())
            // // .then(data=>(this.allusers = data.body.content));
            // .then(data=>{
            //     self.allusers = data.body.content
            //     self.name = [...self.allusers]
            //     console.log(self.name)
            // });
        axios.get('http://localhost:9000/oauth/tokens')
        .then(resp=> {
            self.name = resp.data.body.content
            console.log("alluser--",resp.data.body.content)
            // console.log("params-",$route.params.id)
        })
        }
    }
}
</script>