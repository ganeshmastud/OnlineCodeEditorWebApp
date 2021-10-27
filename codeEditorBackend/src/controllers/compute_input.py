import sys, json

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    print("l ",json.loads(lines))
    return lines

def main():
    #get our data as an array from read_in()
    lines = read_in()
    print("data received",lines)
   

#start process
if __name__ == '__main__':
    main()