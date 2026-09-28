import urllib.request
import time
import os

manifest = {
  "civil": {
    "road": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Road_construction_in_Botswana.jpg",
    "bridge": "https://upload.wikimedia.org/wikipedia/commons/d/de/Concrete_bridge_construction_site_near_Reily%2C_Ohio_1909_%283199663235%29.jpg",
    "drainage": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Concrete_Drainage_Sump_Beaminster_Tunnel_-_geograph.org.uk_-_4471668.jpg",
    "water": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Digging_underground_pipe_instalation_water_drainage_roof_%284%29.jpg",
    "sewerage": "https://upload.wikimedia.org/wikipedia/commons/5/57/Sewer_repairs_at_Appley%2C_Ryde%2C_Isle_of_Wight%2C_England.jpg",
    "utilities": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Utility_trench_in_Bwy_%40_42_St_jeh.jpg",
    "land": "https://upload.wikimedia.org/wikipedia/commons/2/21/Excavator_and_earthworks_by_Bluestone_-_geograph.org.uk_-_7512741.jpg"
  },
  "commercial": {
    "office": "https://upload.wikimedia.org/wikipedia/commons/7/76/Construction_of_a_new_office-building_near_Beatrixkwartier_in_The_Hague_city%3B_high_resolution_image_by_FotoDutch%2C_June_2013.jpg",
    "retail": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Jerusalem_Zion_Square_Shopping_mall_construction_site.JPG",
    "institutional": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Construction_site%2C_Ivy_Lane_School%2C_Wakefield_-_geograph.org.uk_-_8062147.jpg"
  },
  "residential": {
    "villa": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Balatonakali_house_under_construction.jpg",
    "apartment": "https://upload.wikimedia.org/wikipedia/commons/9/9f/11_Liebherr_construction_crane_at_a_Strabag_company_construction_site_of_apartment_building_in_Budapest%2C_Hungary.jpg",
    "gated": "https://upload.wikimedia.org/wikipedia/commons/9/96/Construction_site%2C_off_Vauxhall_Road_-_geograph.org.uk_-_6914215.jpg",
    "renovation": "https://upload.wikimedia.org/wikipedia/commons/3/36/BubbleDeck_SemiPrecastPanel.jpg"
  },
  "industrial": {
    "warehouse": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Steel_frame_to_new_warehouse_for_Next_-_geograph.org.uk_-_4477870.jpg",
    "peb": "https://upload.wikimedia.org/wikipedia/commons/4/40/IIT_Mandi_South_Campus_under_construction_Dec_2012_DSC_0923e.jpg",
    "factory": "https://upload.wikimedia.org/wikipedia/commons/4/46/Industrial_Plant_-_geograph.org.uk_-_4200955.jpg",
    "cold": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Les_Portes_d%27Arcueil%2C_construction_6.jpg",
    "foundation": "https://upload.wikimedia.org/wikipedia/commons/f/f2/VIEW_NORTHEAST%2C_NORTH_ELEVATION_OF_WALL_7%2C_CONCRETE_SECTION_OF_STONE_RUBBLE_WALL_EAST_OF_MILL_FOUNDATION._-_Shenandoah_Pulp_Mill%2C_Shenandoah_Street%2C_Harpers_Ferry%2C_Jefferson_HAER_WVA%2C19-HARF%2C31-11.tif"
  }
}

req = urllib.request.build_opener()
req.addheaders = [('User-Agent', 'AntigravityBot/3.0 (info@example.com)')]
urllib.request.install_opener(req)

import json
workImages = {}

for cat, items in manifest.items():
    os.makedirs(f"public/images/works/{cat}", exist_ok=True)
    workImages[cat] = {}
    for sub, url in items.items():
        dest = f"public/images/works/{cat}/{sub}.jpg"
        print(f"Downloading {cat}/{sub}...")
        try:
            urllib.request.urlretrieve(url, dest)
            workImages[cat][sub] = f"/images/works/{cat}/{sub}.jpg"
            print("  -> Success")
        except Exception as e:
            print(f"  -> Failed: {e}")
            workImages[cat][sub] = "/works/civil.jpg" # fallback to previous downloaded image
        time.sleep(1.5) # Sleep to avoid 429

with open("src/data/workImages.ts", "w") as f:
    f.write("export const workImages = " + json.dumps(workImages, indent=2) + ";\n")
