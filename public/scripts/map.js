    // // Initialize and add the map
    // function initMap() {
    //   const pins = {
    //     ottawa: {lat: 45.424721,lng: -75.695000},
    //     toronto: {lat: 43.653908, lng: -79.384293}
    //   }
    //   // The map, centered at Ottawa
    //   const map = new google.maps.Map(document.getElementById("map"), {
    //     zoom: 4,
    //     center: pins.ottawa,
    //   });

    //   for (const element in pins) {
    //     const marker = new google.maps.Marker({
    //       position: pins[element],
    //       map: map
    //     })
    //   }
    //   map.zoom = 5;
    // }

    const {
      Pool
    } = require('pg');

    const pool = new Pool({
      user: 'labber',
      password: 'labber',
      host: 'localhost',
      database: 'midterm',
      port: '5432'
    });


    const createPin = function (lat, lng) {

      let queryString = `INSERT INTO pin (latitude, longitude) VALUES ($1, $2) `;

      let queryParams = [lat, lng]

      console.log(queryString, queryParams);

      queryString += ` RETURNING *;`;

      return pool
        .query(queryString, queryParams)
        .then(res => res.rows)
        .catch(e => console.error(e.message))

    }

    function initMap() {
      const myLatlng = {
        lat: 45.424721,
        lng: -75.695000
      };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
      });
      // const marker = new google.maps.Marker({
      //   position: myLatlng,
      //   map,
      //   title: "Click to zoom",
      // });

      google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
        console.log(event.latLng.toJSON().lat)
        console.log(event.latLng.toJSON().lng)

        const pool = new Pool({
          user: 'labber',
          password: 'labber',
          host: 'localhost',
          database: 'midterm',
          port: '5432'
        });

        let queryString = `INSERT INTO pin (latitude, longitude) VALUES ($1, $2) `;
        let queryParams = [event.latLng.toJSON().lat, event.latLng.toJSON().lng]
        console.log(queryString, queryParams);
        queryString += ` RETURNING *;`;

        return pool
          .query(queryString, queryParams)
          .then(res => res.rows)
          .catch(e => console.error(e.message))
        // await createPin(event.latLng.toJSON().lat, event.latLng.toJSON().lng)
      });

      function placeMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });


      }
    }
