#Han 4/6/19
#may have to manually strip the data to remove the extra curly braces try writing a method with .strip() to remove in the future

def read_data(inputFile):
    total = ()
    file = open(inputFile, "r+")
    f = file.readlines()
    for x in f:
        line = x.split("{}")
        for i in line:
            d = eval(i) #relatively safe because data is controlled
            total = total+d
    file.close()
    return total


def remove_null(inputFile, matchThreshold):
    cleaned = []
    temp = read_data(inputFile)
    for i in range(0, len(temp)):
        tempdict = temp[i]
        if (tempdict["match"] != ""):
            if (int(tempdict["match"]) <= matchThreshold):
                cleaned.append(temp[i])
    return cleaned


def remove_duplicates(outputFile, inputFile,  matchThreshold):
    f = open(outputFile, "w+")
    duplicatelist = remove_null(inputFile, matchThreshold)
    finished = []
    for i in range(0, len(duplicatelist)):
        if duplicatelist[i] not in duplicatelist[i + 1:]:
            finished.append(duplicatelist[i])
            f.write(str(duplicatelist[i]))
    f.close()


inputFile = str(input("Enter an input file to read from: "))
outputFile = str(input("Enter an output file to write to: "))
matchThreshold = int(input("Enter match limit: "))
remove_duplicates(outputFile, inputFile, matchThreshold)










