from json import loads, dumps
from glob import glob

INVENTORY = "..\\..\\..\\src\\assets\\inventory.json"
NEW_INVENTORY = "..\\..\\..\\src\\assets\\inventory.new.json"

# Get existing inventory
print("[+] Reading in existing inventory")
with open(INVENTORY,'r') as f:
    existing_inventory = loads(''.join(f.readlines()))

imgs = [existing_inventory[i]["img"] for i in existing_inventory]
new_json = existing_inventory

# Get directory items
print("[+] Getting new inventory")
products = glob("*.png") +  glob("*.jpg")
for product in products:
    if product not in imgs:
        new_json[f'new_{product}'] = {"img":product,"price":"INSERT_PRICE","cart":product.split('.')[0]}

# Write to new inventory file
print(f"[+] writing new inventory at {NEW_INVENTORY}")
with open(NEW_INVENTORY,'w') as f:
    f.write(dumps(new_json,indent=4))
