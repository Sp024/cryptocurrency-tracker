
$(document).ready(function () {
    $('.width-75').hide()
    const roundUp = (vals) => {
        vals = parseFloat((Math.round(vals * 10) / 10).toFixed(2))
        return vals == 0 ? '0.0' : vals
    }
    const textColor = (vals) => {
        return roundUp(vals) >= 0 ? 'text-success' : 'text-danger'
    }
    const commaSeprate = (vals) => {
        return (vals !== null) ? parseFloat(vals).toLocaleString() : '∞'
    }
    const id = new URLSearchParams(window.location.search).get('id');
    const getData = () => {
        $.ajax({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/' + id,
            success: function (data) {

                // data.forEach(coindata =>{

                //     coinvalConvert = `
                //     <input type="text" id="cryp-coin" placeholder="Crypto Coin" name="c" value="${coindata.current_price}" />
                //     <input type="text" id="usd" placeholder="USD" name="u" value="" />`
                // })

                $('.rank').text(`Rank #${data.market_cap_rank}`)
                $('.logo').attr('src', data.image.thumb)
                $('.image').attr('src', data.image.large)
                $('.coin-symbol').text(data.symbol.toUpperCase())
                $('.coin-name').text(data.name)
                $('.coin-price').text(`$${commaSeprate(data.market_data.current_price.usd.toFixed(2))}`)
                $('.price-change').html(`
                <i class="fa-solid fa-caret-${data.market_data.price_change_percentage_24h > 0 ? 'up' : 'down'}"></i>
                ${roundUp(data.market_data.price_change_percentage_24h)}%
                `)
                .addClass(textColor(data.market_data.price_change_percentage_24h))
                $('.market-cap').text(`$${commaSeprate(data.market_data.market_cap.usd)}`)
                $('.24h-per-change').text(`${commaSeprate(data.market_data.price_change_percentage_24h)}%`)
                $('.total-vol').text(`$${commaSeprate(data.market_data.total_volume.usd)}`)
                $('.circulating-supply').text(`${commaSeprate(data.market_data.circulating_supply)}`)
                $('.diluted-val').text(`$${commaSeprate(data.market_data.fully_diluted_valuation.usd)}`)
                $('.max-supply').text(`${commaSeprate(data.market_data.max_supply)}`)
                $('.total-supply').text(`${commaSeprate(data.market_data.total_supply)}`)
                $('.width-75').show()

                $('.curr-value').text(`$${commaSeprate(data.market_data.current_price.usd)}`)

                $('.loading').addClass('d-none').removeClass('d-flex')
                clearInterval(myInterval)
            },
            error: function (err) {
                console.log(err)
                $('.loading').addClass('d-flex').removeClass('d-none')
            }
        })
    }
    getData()
    const myInterval = setInterval(getData, 10000);

})