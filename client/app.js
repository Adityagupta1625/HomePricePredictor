function loadLocation() {
  console.log("Page loaded");
  var url = "https://adi-datascience4.herokuapp.com/get_location_names";
  $.get(url, function (data) {
    let select = document.getElementById("location");
    data["locations"].forEach(function (location) {
      let option = document.createElement("option");
      option.text = location;
      option.value = location;
      select.appendChild(option);
    });
  });
}
function getPrice() {
  var url = "https://adi-datascience4.herokuapp.com/predict_prices";
  let sqft = document.getElementById("total_sqft").value;
  let bhk = document.getElementById("bhk").value;
  let location = document.getElementById("location").value;
  let bath = document.getElementById("bath").value;

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft),
      bhk: parseInt(bhk),
      location: location,
      bath: parseInt(bath),
    },
    function (data, status) {
      // alert("Estimated Price is: "+data['estimated_price']);
      if (status == "success") {
        price = data["estimated_price"];
        let p = document.getElementById("price");
        p.innerHTML = price;
        document.getElementById("ap").style.display = "block";
      }
      else{
        alert("Something went wrong");
      }
    }
  );
}

function clearPrice(){
console.log("clear");
   document.getElementById('form').reset();
   document.getElementById('ap').style.display="none";
}