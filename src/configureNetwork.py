from configureEdison import setNetwork, checkNetwork, configureNetwork
from sys import argv

def main():
   networkMap = eval(open('./networks.txt', 'r').read())
   ssid = argv[1]
   network_conf = configureNetwork(ssid, networkMap)
   setNetwork(network_conf, ssid)
   checkNetwork()

main()
