<template>
    <div class="col-md-12">
        
        <div class="col-md-5 text-center custom-modal" :class="{ customFade: modalClose }">
            
            <form v-on:submit.prevent="onSubmit">
                <header id="my-" class="custom-modal-header"><h5 id="my-" class="modal-title"test>Add New User</h5><button type="button" aria-label="Close" class="close" @click="modalCloseAction()">×</button></header>
                <p>
                    <label for="name" hidden>Username</label>
                    <input v-model="name" type="text" id="name" name="name"  placeholder="username" required> 
                </p>
                <p>
                    <label for="email" hidden></label>
                    <input type="email" id="email" name="email" v-model="email" placeholder="email" required> 
                </p>
                <p>
                    <label for="firstname" hidden>firstname</label>
                    <input type="text" id="firstname" name="firstname" v-model='firstname' placeholder="firstname" required>
                </p>
                <p>
                    <label for="lastname" hidden>lastname</label>
                    <input type="text" id="lastname" name="lastname" v-model='lastname' placeholder="lastname" required>
                </p>
                <p>
                    <label for="password" hidden>password</label>
                    <input type="password" id="password" name="password" v-model='password' placeholder="password" required>
                </p>
                <p><button type="submit" class="btn btn-primary my-2">Add</button></p>
            </form>
        </div>
        <div class="custom-modal-backdrop" :class="{ customFade: modalClose }"></div>
        <div id="add-user-btn" class="btn btn-round btn-info" @click="AddUserOpenAction()">Add User &nbsp; <span class="ti-plus"></span></div>
        
        <!-- <p class="alert-success" :class="{showSuccess : isSuccess}">Success </p> -->
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'add-user',
    data(){
        return {
           name : '',
           firstname: '',
           lastname: '',
           email: '',
           password: '',
           responseData: '',
           modalClose: true,
           AddUser: false,
           isSuccess: true,
        }
    },
    methods: {
        async onSubmit(){
            const self=this;
                axios.post('http://localhost:9000/adduser',{ 
                    name: this.name, 
                    firstname: this.firstname, 
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password
                })
                this.modalClose = true;
                // return post;
        },
        modalCloseAction(){
            console.log(this.modalClose,"-modalclose");
            this.modalClose = true;
        },
        AddUserOpenAction(){
            console.log(this.modalClose,"-modalclose");
            this.modalClose = false;
        }
    }
}
</script>
<style language="scss" scoped>
.custom-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.4;
    z-index: 1;
    transition: all .15s ease-in-out;
    
}

.custom-modal {
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 2;
    padding: 25px 0px 0px;
    background: #fff;
    border-radius: 4px;
    transition: all .15s ease-in-out;
}

.customFade {
     visibility: hidden;
     top: -32px;
     z-index: unset;  
}
.custom-modal-header {
    width: 100%;
    height: 40px;

}
.close {
        margin-right: 20px;
        margin-top: -40px;
}
#add-user-btn {
    margin-top: 33px;
    position: relative;
}

p.alert-success{
    transition:opacity .15s ease-in;
}
.showSuccess {
    opacity: 0;
}

</style>