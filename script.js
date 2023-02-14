
$(document).ready(() => {
    var collapseData ='';
    var tableData = '';
    const roundUp = (vals) => {
        vals = parseFloat((Math.round(vals * 10) / 10).toFixed(2))
        return vals == 0 ? '0.0' : vals
    }
    const textColor = (vals) => {
        return roundUp(vals) >= 0 ?  'text-success' : 'text-danger'
    }
    const commaSeprate = (vals) => {
        return (vals !== null) ? parseFloat(vals).toLocaleString() : '∞'
    }
    const getData = () => {
        $.ajax({
            type: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d',
            success: function(coins) {
                
                coins.forEach(data => {


                    //for the collapse bootstrap component to show the states.
                    collapseData = `
                    <div>
                    <p> Market Capitalization: <h5>$${data.market_cap}</h5> </p></div>
                    <div>
                    <p>24h Trading Volume: <h5>$${data.total_volume}</h5></p></div>
                    <div>
                    <p>Change Percentage 24h: <h5>${data.price_change_percentage_24h_in_currency.toFixed(4)}%</h5></p></div>`
                    

                    //It is for to append the data dynamically to bootstrape datatable.
                    tableData += 
                    `<tr>   
                        <td>${data.market_cap_rank}</td>
                        <td valign="top"  class="info" data-id="${data.id}">
                            <img src="${data.image}"width="20px" height="20px" class="align-self-center" alt "" /><b class="mx-1 align-self-center">${data.name}</b>
                            <span class="text-secondary align-self-center mx-2">${data.symbol.toUpperCase()}</span>
                            </td>
                        <td>$${commaSeprate(data.current_price)}</td>
                        <td class='${textColor(data.price_change_percentage_1h_in_currency)}'>
                            ${roundUp(data.price_change_percentage_1h_in_currency)}%
                        </td>
                        <td class='${textColor(data.price_change_percentage_24h_in_currency)}'>
                            ${roundUp(data.price_change_percentage_24h_in_currency)}%
                        </td>
                        <td class='${textColor(data.price_change_percentage_7d_in_currency)}'>
                            ${roundUp(data.price_change_percentage_7d_in_currency)}%
                        </td>
                        <td>$${commaSeprate(data.total_volume)}</td>
                        <td>$${commaSeprate(data.market_cap)}</td>
                        
                    </tr>`
                });

                //id's that we have given to the html elements.
                $('table').removeClass('d-none')
                $('#tbody').html('')
                $('#tbody').html(tableData)
                $('#collapseData').html(collapseData)
                $('#table').DataTable()
                
            },
            //function to show the error.
            error: function(err) {
                console.log(err)
                
            }
        })
    }
    getData()
    $('#tbody').on('click','.info', function() {
        window.location.href = 'coin-details.html?id=' + $(this).data('id')
       
    })
})

