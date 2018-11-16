const apiKey = 'ug5GQ58jETMclcCRdHnqzn2S_E018yVhAFbRpkhsqdeacaYAF6V9I9Lu-zGNCc7ZQwUEPOKnYv4l988XofVeBw4isL0Wes7rGt1yLTL_YHNDsxXmi8U5VXsVuNTuW3Yx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=T${term}&location=${location}&sort_by=${sortBy}`, {
            Authorization: `Bearer ${apiKey}`
        }).then(
            response => response.json()
        ).then(
            jsonResponse => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => ({
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1 + ', ' + business.location.address2 + ', ' + business.location.address3,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].alias,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }));
                }
            }
        );
    }
}

export default Yelp;