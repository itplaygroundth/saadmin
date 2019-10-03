<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Log in</h4>
        <md-button
          slot="buttons"
          href="#"
          @click="socialFacecbookLogin()"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-facebook-square"></i>
        </md-button>
        <!-- <md-button
          slot="buttons"
          href="#twitter"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-twitter"></i>
        </md-button> -->
        <md-button
          slot="buttons"
          href="#"
          @click="socialGoogleLogin()"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-google-plus-g"></i>
        </md-button>
        <p slot="description" class="description">Or</p>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>face</md-icon>
          <label>ยูสเซอร์</label>
          <md-input v-model="firstname"></md-input>
        </md-field>
        <!-- <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field> -->
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>รหัสผ่าน</label>
          <md-input v-model="password"></md-input>
        </md-field>
        <md-button slot="footer" class=" md-success md-lg">
          เข้าสู่ระบบ
        </md-button>
      </login-card>
    </div>
    <notifications group="auth" />
  </div>
</template>
<script>
var apiurl = "https://backend.sagaming.la";
import firebase from "firebase/app";
import "firebase/auth";
import { LoginCard } from "@/components";

export default {
  components: {
    LoginCard
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      type: ["", "info", "success", "warning", "danger"]
    };
  },
  methods: {
    login(value) {
      this.axios.post(apiurl + "/me", value).then(response => {
        //console.log(response);
        if (response.data.status === true) {
          // this.$notify.success({
          //   message: "Success: " + response.data.type,
          //   position: "top right",
          //   timeOut: 5000
          // });
          new Promise(resolve => {
            this.$store.set("facebook", response.data.data[0]);
            this.$session.set("facebook", response.data.data[0]);
            this.notifyVue(response.data.msg);
            resolve(true);
          }).then(value => {
            this.$store.set("isLogged", value);
            this.$session.set("isLogged", value);
            this.$router.replace("/");
          });
        } else {
          this.notifyVue(response.data.msg);
        }
      });
    },
    notifyVue(msg) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message: msg,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: this.type[color]
      });
    },
    socialGoogleLogin: function() {
      const provide = new firebase.auth.GoogleAuthProvider().addScope("email");
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          // create user in db
          let obj = {
            providerId: result.additionalUserInfo.profile.id,
            providerName: "Google",
            fullName: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profileImage: result.additionalUserInfo.profile.picture,
            userTypeId: 1
          };
          this.login(obj);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    socialFacecbookLogin: function() {
      const provide = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          // create user in db
          let obj = {
            providerId: result.additionalUserInfo.profile.id,
            providerName: "Facebook",
            fullName: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profileImage: result.user.photoURL + "?height=500",
            userTypeId: 1
          };
          this.login(obj);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
  }
};
</script>

<style></style>
