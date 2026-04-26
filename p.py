import os

base_dir = "dataset_pisang/test"

for cls in os.listdir(base_dir):
    cls_path = os.path.join(base_dir, cls)
    if os.path.isdir(cls_path):
        print(cls, ":", len(os.listdir(cls_path)), "gambar")

