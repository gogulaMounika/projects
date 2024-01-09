        //javascript for navigation bar effects on scroll
        window.addEventListener("scroll", function(){
            const header = document.querySelector("header");
            header.classList.toggle('sticky', window.scrollY > 0);
          });
          
          //javascript for responsive navigation sidebar menu
          const menuBtn = document.querySelector(".menu-btn");
          const navigation = document.querySelector(".navigation");
          const navigationItems = document.querySelectorAll(".navigation a")
          
          menuBtn.addEventListener("click",  () => {
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
          });
          
          navigationItems.forEach((navigationItem) => {
            navigationItem.addEventListener("click", () => {
              menuBtn.classList.remove("active");
              navigation.classList.remove("active");
            });
          });
          
          //javascript for scroll to top button
          const scrollBtn = document.querySelector(".scrollToTop-btn");
          
          window.addEventListener("scroll", function(){
            scrollBtn.classList.toggle("active", window.scrollY > 500);
          });
          
          //javascript for scroll back to top on click scroll-to-top button
          scrollBtn.addEventListener("click", () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          });
          
          //javascript for reveal website elements on scroll
          window.addEventListener("scroll", reveal);
          
          function reveal(){
            var reveals = document.querySelectorAll(".reveal");
          
            for(var i = 0; i < reveals.length; i++){
              var windowHeight = window.innerHeight;
              var revealTop = reveals[i].getBoundingClientRect().top;
              var revealPoint = 50;
          
              if(revealTop < windowHeight - revealPoint){
                reveals[i].classList.add("active");
              }
            }
          }
              //   login form code starts
          
          document.getElementById("loginForm").addEventListener("submit", function(event) {
              event.preventDefault();
          
              // Retrieve username and password
              var email = document.getElementById("email").value;
              var username = document.getElementById("username").value;
          
              // Perform basic validation
              if (email.trim() === "" || username.trim() === "") {
                  alert("Please enter both username and email");
                  return;
              }
          
              // For demonstration purposes, you can perform additional validation or authentication logic here.
              // In a real-world scenario, this would be handled on the server side.
          
              alert("successful your message is Redirecting...");
              // Redirect or perform further actions after successful login.
          });
          
             //   login form code ends