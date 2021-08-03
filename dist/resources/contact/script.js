(() => {
  // src/utils/data.js
  var data = {
    a\u00F1o: 2021
  };

  // src/views/Contact/script.js
  console.log("In Contact: ", data);

  // src/views/Contact/index.jsx
  var ContactView = (props) => {
    return /* @__PURE__ */ React.createElement("div", {
      id: "contact"
    }, /* @__PURE__ */ React.createElement("h1", null, " Contact! "));
  };

  // src/pages/contact.jsx
  var ContactPage = (props) => /* @__PURE__ */ React.createElement(ContactView, {
    ...props
  });
  var getStaticProps = () => {
    return {
      data: {
        title: "Darwin - Contact"
      }
    };
  };
  var contact_default = ContactPage;
})();
