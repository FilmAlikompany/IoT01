import requests
from time import sleep
from adc_8chan_12bit import Pi_hat_adc

adc = Pi_hat_adc()
api_key = '2GLHGNIYY08EA116'
url = 'https://api.thingspeak.com/update'

def send_data(brightness):
    response = requests.get(url,
        params = {
            'api_key': api_key,
            'field1': brightness
        })
    print(response.json)

def main_loop():
    while True:
        print(adc.get_nchan_adc_raw_data(0))
        send_data(adc.get_nchan_adc_raw_data(0))
        sleep(30)

if __name__ == '__main__':
    main_loop()