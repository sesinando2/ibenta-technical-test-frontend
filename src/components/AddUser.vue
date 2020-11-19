<template>
    <div class="col-md-12 text-center">
        <form v-on:submit.prevent="onSubmit">
            <p>
                <label for="name" hidden>Username</label>
                <input v-model="name" type="text" id="name" name="name"  placeholder="username"> 
            </p>
            <p>
                <label for="email" hidden></label>
                <input type="email" id="email" name="email" v-model="email" placeholder="email"> 
            </p>
            <p>
                <label for="firstname" hidden>firstname</label>
                <input type="firstname" id="firstname" name="firstname" v-model='firstname' placeholder="firstname">
            </p>
            <p>
                <label for="lastname" hidden>lastname</label>
                <input type="lastname" id="lastname" name="lastname" v-model='lastname' placeholder="lastname">
            </p>
            <p>
                <label for="password" hidden>password</label>
                <input type="password" id="password" name="password" v-model='password' placeholder="password">
            </p>
            <p><button type="submit" class="btn btn-primary my-2">Add</button></p>
        </form>
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
        }
    },
    methods: {
        onSubmit(){
            // fetch('http://localhost:9000/oauth/test')
            // .then(response =>response.json())
            // .then(data => 
            //     {
            //         if(data == 200) {
            //             axios.post('http://localhost:9000/adduser',{ params: { 
            //                 username: this.username, 
            //                 firstname: this.firstname, 
            //                 lastname: this.age,
            //                 email: this.email,
            //                 password: this.password
            //             }})
            //             .then(response => this.responseData = response.data)
            //             .catch(error => {console.log('error ' + error);   });
            //         }
            //     }
            // );
            axios.post('http://localhost:9000/adduser',{ 
                    name: this.name, 
                    firstname: this.firstname, 
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password
                })
                .then(response => this.responseData = response.data)
                .catch(error => {console.log('error ' + error);   });
        }
    }
}
</script>