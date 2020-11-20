<template>
    <div class='col-md-12'>
         <table class="table" :class="tableClass">
             <tbody>
                 <tr>
                    <th>Name</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
                <tr v-for="(alluser, index) in userlist" :key="alluser.id" v-if="userlist.length>=1" >
                    <td>
                        <div v-if="inlineEditId==alluser.id">
                            <input v-model="alluser.name" 
                                    :class="`input-class-${index}`"
                                    @keydown.enter="updateInline(alluser,index)"/>
                            </div>
                        <div v-else @click="actionEdit(alluser,index)">{{alluser.name}}</div>
                    </td>
                    <td>
                        <div v-if="inlineEditId==alluser.id">
                            <input v-model="alluser.firstName" 
                                    :class="`input-class-${index}`"
                                    @keydown.enter="updateInline(alluser,index)"/>
                        </div>
                        <div v-else @click="actionEdit(alluser,index)">{{alluser.firstName}}</div>
                    </td>
                    <td>
                        <div v-if="inlineEditId==alluser.id">
                            <input v-model="alluser.lastName" 
                                    :class="`input-class-${index}`"
                                    @keydown.enter="updateInline(alluser,index)"/>
                        </div>
                        <div v-else @click="actionEdit(alluser,index)">{{alluser.lastName}}</div>
                    </td>
                    <td>
                        <div v-if="inlineEditId==alluser.id">
                            <input v-model="alluser.email" 
                                    :class="`input-class-${index}`"
                                    @keydown.enter="updateInline(alluser,index)"/>
                        </div>
                        <div v-else @click="actionEdit(alluser,index)">{{alluser.email}}</div>
                    </td>
                    <td>
                        <div v-if="inlineEditId==alluser.id">
                            <input v-model="alluser.password" 
                                    :class="`input-class-${index}`"
                                    @keydown.enter="updateInline(alluser,index)"/>
                        </div>
                        <div v-else @click="actionEdit(alluser,index)">{{alluser.password}}</div>
                    </td>
                    <td class="item-action">
                        <div v-if="inlineEditId==alluser.id">
                            <b class="pointer float-left" :class="`input-class-${index}`" @click="cancelEdit(alluser)"><i class="close mr-3">x</i></b>
                            <b class="pointer delete-btn" :class="`input-class-${index}`" @click="deleteItem(alluser)"><i class="fa fa-trash"></i></b>
                        </div>
                        <div v-else></div>
                    </td>
                </tr>
                <tr v-else>No Data</tr>
             </tbody>
            
            
        </table>
    </div>
</template>
<script>
import axios from 'axios';
// import { PaperTable } from "@/components";
export default {
    name: 'user-table',
    props: {
        userlist: Array,
        type: String
    },
    components: {
        // PaperTable
    },
    data(){
        return {
            responseData:'',
            inlineEditId: 0,
            isEdit: false
        }
    },
    mounted(){
    },
    computed: {
        tableClass() {
            return `table-${this.type}`;
        }
    },
    methods: {
        actionEdit(alluser,index){
            this.inlineEditId = alluser.id;
            this.isEdit = true; 
            console.log("actionedit")
            setTimeout(()=>{
                document.getElementsByClassName(`input-class-${index}`)[index].focus();
            },1)
            
        },
        trblur(alluser){
            this.inlineEditId = 0;
        },
        updateInline(alluser,index){
            const self  = this.alluser;
            const getinput = "document.getElementById";
            const colname = [alluser.name, alluser.firstName, alluser.lastName, alluser.email];
            const inputClass = document.getElementsByClassName(`input-class-${index}`)
            console.log("update inline-",self)
                console.log("alluser--",alluser.name);
                const vm = this;
                axios.put('http://localhost:9000/updateuser',{ 
                        name: alluser.name, 
                        firstname: alluser.firstName, 
                        lastname: alluser.lastName,
                        email: alluser.email,
                        password: alluser.password,
                        id: alluser.id
                    })
                    .then(response => {
                        vm.responseData = response.data;
                        console.log("update-",response)
                    })
                    .catch(error => {console.log('error ' + error);   });
                    // break;
                // }
            // }
            this.inlineEditId = 0;
            this.isEdit = false;
            
        },
        cancelEdit(alluser){
            this.inlineEditId=0
        },
        deleteItem(alluser){
            const self=this;
            console.log("deleteitem")
            axios.delete('http://localhost:9000/deleteuser',{ 
                         data: { id: alluser.id } 
                    })
                    .then(response => {
                        self.responseData = response.data;
                        console.log("delete",self.responseData)
                    })
                    .catch(error => {console.log('error ' + error);   });
                    console.log("axios")
        }
    }
}
</script>
<style lang="scss" scoped>
    .pointer {
        cursor: pointer;
    }
    .pointer .close {
        font-size: 19px;
    }
    .pointer:hover.close-btn{
        color: #3f3f3f;
    }
    .item-action {
        padding: 15px;
    }

    .table-hover tbody tr:hover {
        color: #212529;
        background-color: rgba(0, 0, 0, 0.075);
    }
</style>