import matplotlib.pyplot as plt

# ----------- PLOT GRAFIK -----------
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs = range(len(acc))

plt.figure(figsize=(12,4))

# --- MODEL ACCURACY ---
plt.subplot(1, 2, 1)
plt.plot(epochs, acc, label='Train')
plt.plot(epochs, val_acc, label='Validation')
plt.title('Model accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

# --- MODEL LOSS ---
plt.subplot(1, 2, 2)
plt.plot(epochs, loss, label='Train')
plt.plot(epochs, val_loss, label='Validation')
plt.title('Model loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.tight_layout()
plt.savefig("training_graph.png")  # optional
plt.show()
