<template>
  <div class="user">
    <div class="photo">
      <img :src="avatar" alt="avatar" />
    </div>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span v-if="$route.meta.rtlActive">
          {{ rtlTitle }}
          <b class="caret"></b>
        </span>
        <span v-else>
          {{ title }}
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <li>
                <a href="#" @click="Logout">
                  <span class="sidebar-normal">Logout</span>
                </a>
              </li>
              <!-- <li>
                <a v-if="$route.meta.rtlActive" href="#vue">
                  <span class="sidebar-mini">مع</span>
                  <span class="sidebar-normal">ملف</span>
                </a>
                <a v-else href="#vue">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </a>
              </li>
              <li>
                <a v-if="$route.meta.rtlActive" href="#vue">
                  <span class="sidebar-mini">هوع</span>
                  <span class="sidebar-normal">تعديل الملف الشخصي</span>
                </a>
                <a v-else href="#vue">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </a>
              </li>
              <li>
                <a v-if="$route.meta.rtlActive" href="#vue">
                  <span class="sidebar-mini">و</span>
                  <span class="sidebar-normal">إعدادات</span>
                </a>
                <a v-else href="#vue">
                  <span class="sidebar-mini">S</span>
                  <span class="sidebar-normal">Settings</span>
                </a>
              </li> -->
            </slot>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";

export default {
  components: {
    CollapseTransition
  },
  props: {
    // title: {
    //   type: String,
    //   default: "Tania Andrew"
    // },
    rtlTitle: {
      type: String,
      default: "تانيا أندرو"
    }
    // avatar: {
    //   type: String,
    //   default: "./img/faces/avatar.jpg"
    // }
  },
  data() {
    return {
      isClosed: true
    };
  },
  computed: {
    title() {
      return this.$session.get("facebook").fullName;
    },
    avatar() {
      return this.$session.get("facebook").profileImage;
    }
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    },
    Logout() {
      this.$store.set("isLogged", false);
      this.$store.set("facebook", false);
      this.$session.destroy();
      this.$router.replace("/login");
    }
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
