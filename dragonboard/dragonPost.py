
# coding: utf-8

# # Send data to the server
# Probably using a get request to tell the server to increment 

# In[5]:


import serial, sys

ard = serial.Serial('/dev/tty96B0', 115200)


# In[1]:


import requests


# In[1]:


def checkPost(r, ard):
    if r.status_code == 200:
        print("Good POST")
        ard.write(b'g')
    else:
        print("Error:", r.status_code, r.reason)
        ard.write(b'b')
    


# In[3]:


def increment(clubID, ard):
    r = requests.post("http://10.245.1.242:8000/entry/" + clubID, data={'number': 12524, 'type': 'issue', 'action': 'show'})
    checkPost(r, ard)


# In[4]:


def decrement(clubID, ard):
    r = requests.post("http://10.245.1.242:8000/leave/" + clubID, data={'number': 12524, 'type': 'issue', 'action': 'show'})
    checkPost(r, ard)


# In[8]:


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python3 dragonPost.py <clubID>")
        exit()
    clubID = sys.argv[1]
    if clubID == '0':
        print("Usage: make makefile clubID=<clubID>")
    print("Welcome to the Club Cracker! To quit, press CTRL + C")
    try:
        while True:
            ardOut = str(ard.readline())
            if ardOut.find("increment") != -1:
                increment(clubID, ard)
            if ardOut.find("decrement") != -1:
                decrement(clubID, ard)
    except KeyboardInterrupt:
        print("CTRL-C!! Exiting...")

